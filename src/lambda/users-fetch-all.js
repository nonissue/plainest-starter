const fakeUsersMock = require('./users.json');

exports.handler = async () => {
  const users = fakeUsersMock;

  if (!users) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not fetch local users',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};
