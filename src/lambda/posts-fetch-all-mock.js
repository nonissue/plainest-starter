const fakePostsMock = require('./posts.json');

exports.handler = async () => {
  const posts = fakePostsMock.slice(0, 15);

  if (!posts) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not fetch local posts',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(posts),
  };
};
