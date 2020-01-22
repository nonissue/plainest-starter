import { getBaseURL } from '../getBaseURL';

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
