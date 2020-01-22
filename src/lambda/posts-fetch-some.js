/* eslint-disable camelcase */
const fakePostsMock = require('../data/posts.json');

/* 
Damn that's a lot of tricky logic to implement...

IMPORTANT: This should all just be in a generic fetch posts endpoint
that accepts form-encoded optional params

This shouldn't be using POST, should be using form-encoded data.

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
  // if (event.httpMethod !== 'POST') {
  //   return { statusCode: 405, body: 'Method Not Allowed' };
  // }

  let options = {};
  let starting_from = 0;
  let ending_before = 15;
  // let limit = 10;

  if (event.body) {
    try {
      options = JSON.parse(event.body);
    } catch (e) {
      throw new Error('Invalid API options. API options must be provided as a JSON object');
    }
  }

  let limit = options.limit > 0 && options.limit < 50 ? options.limit : 10;
  // const options = JSON.parse(event.body);

  if (event.body) {
    if (options.limit) {
      if (options.limit > 0 && options.limit < 50) {
        limit = options.limit;
      } else {
        console.log('invalid limit');
        return {
          headers: {
            'Content-Type': 'text/json',
          },
          statusCode: 500,
          body: JSON.stringify({
            error: 'invalid limit',
          }),
        };
      }
    }

    if (options.starting_from) {
      if (options.starting_from >= 0 && options.starting_from < 50) {
        starting_from = options.starting_from;
      } else {
        console.log('invalid starting_from id');
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
    }

    // const limit = event.limit > 0 ? context.limit : 30;

    if (options.ending_before) {
      if (options.ending_before >= 0 && options.ending_before - limit > 0) {
        ending_before = options.ending_before;
      } else {
        console.log('invalid ending_before id' + ending_before);
        return {
          headers: {
            'Content-Type': 'text/json',
          },
          statusCode: 500,
          body: JSON.stringify({
            error: 'Error fetching posts ending_before',
          }),
        };
      }
    }
  }

  // const posts = fakePostsMock.slice(starting_from, starting_from + limit);

  const posts = fakePostsMock.slice(ending_before - limit, ending_before);

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
