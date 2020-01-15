const fakePostsMock = require('../data/posts.json');

// Object.freeze(fakePostsMock);

exports.handler = async () => {
  // const posts = shuffle(fakePostsMock).slice(0, 15);
  const posts = fakePostsMock;

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
