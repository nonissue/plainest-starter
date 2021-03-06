const fakeUsers = require('./users.json');

/*
RENAME THIS
*/

/* tests
* getId returns number
* fakeUsers is json array of objects?
* finds user when user with id exists, else returns 500

*/

function getId(urlPath) {
  return Number(urlPath.match(/([^/]*)\/*$/)[0]);
}

exports.handler = async event => {
  const id = getId(event.path);
  const user = fakeUsers.find(u => u.id === id);

  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify({
      error: 'user not found',
    }),
  };
};
