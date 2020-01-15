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
    headers: {
      'Content-Type': 'text/json',
    },
    body: JSON.stringify(fakePosts.data),
  };
};
