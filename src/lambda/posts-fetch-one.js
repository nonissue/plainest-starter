/* tests
 * getId returns number
 * fakeUsers is json array of objects?
 * finds user when user with id exists, else returns 500
 */

const fakePosts = require('../data/posts.json');

function getId(urlPath) {
  return Number(urlPath.match(/([^/]*)\/*$/)[0]);
}

exports.handler = async event => {
  const id = getId(event.path);
  const post = fakePosts.find(p => p.id === id);

  if (event.body) {
    console.log(event.body);
  }

  // console.log(post);

  if (post) {
    // throw new Error('Posts fetched error', 'Error fetching posts');
    // return {
    //   statusCode: 400,
    //   body: JSON.stringify({ error: { code: 666, msg: 'Error fetching posts' } }), // Could be a custom message or object i.e. JSON.stringify(err)
    // };
    return {
      headers: {
        'Content-Type': 'text/json',
      },
      statusCode: 200,
      body: JSON.stringify(post),
    };
  }

  return {
    headers: {
      'Content-Type': 'text/json',
    },
    statusCode: 500,
    body: JSON.stringify({
      error: 'post not found',
    }),
  };
};
