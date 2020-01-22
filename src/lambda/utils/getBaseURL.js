export const getBaseURL = host => {
  let baseURL;
  if (host === 'localhost:9000') {
    baseURL = 'http://localhost:9000/.netlify/functions';
  } else {
    baseURL = 'http://start-plain.netlify.com/.netlify/functions';
  }
  return baseURL;
};
