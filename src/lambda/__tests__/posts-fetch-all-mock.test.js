import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { handler } from '../posts-fetch-all-mock';

jest.mock('axios');

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = await handler();
    // console.log(JSON.parse(data.body));
    // console.log(typeof data.body);
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    expect(JSON.parse(data.body).length).toEqual(15);
  });
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
  });
});
