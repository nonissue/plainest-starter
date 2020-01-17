import axios from 'axios';

const fakePostsMock = require('../data/posts.json');

const getUser = async (baseURL, id) =>
  axios.get(`${baseURL}/users-fetch-one/${id}`).then(res => {
    return res.data;
  });

/* 

This is very slow if we fetch users while constructing the mosts object
Slower than if the component makes the user request itself
Hmm

IN PROGRESS
*/

exports.handler = async event => {
  const baseURL =
    event.headers.host === 'localhost:9000'
      ? 'http://localhost:9000/.netlify/functions'
      : 'http://start-plain.netlify.com/.netlify/functions';
  const postsData = fakePostsMock.slice(0, 50);
  const postsWithUsers = async () => {
    return Promise.all(
      postsData.map(async post => ({
        ...post,
        user: await getUser(baseURL, post.userId),
      })),
    );
  };

  const postsWithUsersFast = () => {
    return postsData.map(post => ({
      ...post,
      user: { name: 'test' },
    }));
  };

  let posts;
  try {
    posts = postsData;
  } catch (e) {
    console.log(e);
  }

  // posts = postsData;
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
    body: JSON.stringify(postsData),
  };
};
