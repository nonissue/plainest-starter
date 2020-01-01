const fakePostsMock = require('./posts.json');

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(fakePostsMock.slice(0, 10)),
  };
};
