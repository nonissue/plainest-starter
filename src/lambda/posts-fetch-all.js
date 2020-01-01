const axios = require('axios');

exports.handler = async () => {
  let fakePosts;
  try {
    fakePosts = await axios.get('https://jsonplaceholder.typicode.com/posts');
  } catch (err) {
    throw new Error('posts-fetch-all error');
  }

  return {
    statusCode: 200,
    body: JSON.stringify(fakePosts.data),
  };
};
