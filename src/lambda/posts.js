import axios from 'axios';
import { getBaseURL } from './utils/getBaseURL';

const fakePostsMock = require('../data/posts.json');

const getUser = (baseURL, id) =>
  axios.get(`${baseURL}/users-fetch-one/${id}`).then(res => {
    return res.data;
  });

/* 

This is very slow if we fetch users while constructing the mosts object
Slower than if the component makes the user request itself
(Total fetch time for all posts with user info: 500ms-900ms)

Update: Hmm, maybe not that slow. Postman shows that each individual
user request is 10-30 ms, so it makes sense that a full fetch of all info
would be a few hundred MS

TODO: 
- [ ] pagination
- [ ] 
*/

/** 
Endpoint for fetching some posts
Param structure inspired by stripes api documentation

 * Params
 * @param {number} limit - (optional, default 10)  number of posts to return
 * @param {string} starting_after - (optional) A cursor for use in pagination. starting_after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include starting_after=obj_foo in order to fetch the next page of the list.
 * @param {string} ending_before - (optional)  ending_before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_bar, your subsequent call can include ending_before=obj_bar in order to fetch the previous page of the list.

 * Returns
 * @param  {object} response - A response object with info about the request. Fetched posts are available in response.body
 * @param  {object} error - HTTP error
*/
exports.handler = async event => {
  // const baseURL =
  //   event && event.headers && event.headers.host === 'localhost:9000'
  //     ? 'http://localhost:9000/.netlify/functions'
  //     : 'http://start-plain.netlify.com/.netlify/functions';

  const baseURL = getBaseURL(event.headers.host);

  let {
    limit,
    starting_from: start,
    ending_before: end,
    with_users: withUsers,
  } = event.queryStringParameters;

  limit = Number(limit);
  start = Number(start);
  end = Number(end);
  withUsers = Boolean(withUsers);

  limit = limit > 0 && limit < 20 ? limit : 10;
  start = start > 0 && start + limit < fakePostsMock.length ? start : 0;
  end = end > 0 && end - limit > 0 ? end : 0;

  let postsData;

  if (start) {
    postsData = fakePostsMock.slice(start, start + limit);
  } else if (end) {
    postsData = fakePostsMock.slice(end - limit, end);
  } else {
    postsData = fakePostsMock.slice(0, limit);
  }

  const postsWithUsers = async () => {
    return Promise.all(
      postsData.map(async post => ({
        ...post,
        user: await getUser(baseURL, post.userId),
      })),
    );
  };

  let posts;
  if (withUsers) {
    try {
      posts = await postsWithUsers();
    } catch (e) {
      throw new Error('Error fetching posts author info');
    }
  } else {
    posts = postsData;
  }

  if (!posts) {
    return {
      headers: {
        'Content-Type': 'text/json',
      },
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not fetch local posts',
      }),
    };
  }

  return {
    headers: {
      'Content-Type': 'text/json',
    },
    statusCode: 200,
    body: JSON.stringify(posts),
  };
};
