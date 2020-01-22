import axios from 'axios';

const fakePostsMock = require('../data/posts.json');

export const getUser = (baseURL, id) =>
  axios
    .get(`${baseURL}/users-fetch-one/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log('error fetching users');
      return e;
    });

/* 

This is very slow if we fetch users while constructing the mosts object
Slower than if the component makes the user request itself
(Total fetch time for all posts with user info: 500ms-900ms)

Update: Hmm, maybe not that slow. Postman shows that each individual
user request is 10-30 ms, so it makes sense that a full fetch of all info
would be a few hundred MS
*/

export const getBaseURL = host => {
  let baseURL;
  if (host === 'localhost:9000') {
    baseURL = 'http://localhost:9000/.netlify/functions';
  } else {
    baseURL = 'http://start-plain.netlify.com/.netlify/functions';
  }
  return baseURL;
};

exports.handler = async event => {
  // const baseURL = getBaseURL(event.headers.host);
  const baseURL =
    event.headers.host === 'localhost:9000'
      ? 'http://localhost:9000/.netlify/functions'
      : 'http://start-plain.netlify.com/.netlify/functions';

  const postsData = fakePostsMock.slice(0, 100);

  const postsWithUsers = async () => {
    return Promise.all(
      postsData.map(async post => ({
        ...post,
        user: await getUser(baseURL, post.userId),
      })),
    );
  };

  let posts;
  try {
    posts = await postsWithUsers();
    // posts = postsData;
  } catch (e) {
    throw new Error('Error fetching posts author info');
    // console.log(e);
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
