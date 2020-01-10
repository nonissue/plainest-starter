/* tests
 * getId returns number
 * fakeUsers is json array of objects?
 * finds user when user with id exists, else returns 500
 */

const fakePosts = require('./posts.json');

function getId(urlPath) {
  return Number(urlPath.match(/([^/]*)\/*$/)[0]);
}

exports.handler = async event => {
  const id = getId(event.path);
  const post = fakePosts.find(p => p.id === id);

  if (post) {
    return {
      statusCode: 200,
      body: JSON.stringify(post),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({
      error: 'post not found',
    }),
  };
};
