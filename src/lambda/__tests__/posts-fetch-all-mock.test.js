import axios from 'axios';
// import { BrowserRouter as Router } from 'react-router-dom';
import { handler, getUser, getBaseURL } from '../posts-fetch-all-mock';
// const handler = require('../posts-fetch-all-mock');

jest.mock('axios');

describe('fetchData', () => {
  // it('fetches successfully data from an API', async () => {
  //   const data = [{}];
  //   axios.get.mockImplementationOnce(() => Promise.resolve(data));
  //   await expect(handler({ headers: { host: 'localhost:9000' } })).resolves.toEqual(data);
  // });
  it('baseURL returns correct URL', () => {
    const host = 'localhost:9000';
    const res = getBaseURL(host);
    expect(res).toBe('http://localhost:9000/.netlify/functions');
  });
  it('baseURL returns correct URL for prod', () => {
    const host = '';
    const res = getBaseURL(host);
    expect(res).toBe('http://start-plain.netlify.com/.netlify/functions');
  });
});
