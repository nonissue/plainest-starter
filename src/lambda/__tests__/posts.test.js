import axios from 'axios';
// import { BrowserRouter as Router } from 'react-router-dom';
import { handler } from '../posts';
// const handler = require('../posts-fetch-all-mock');

jest.mock('axios');

const data = {
  body: JSON.stringify([
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body:
        'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    },
  ]),
  headers: {
    'Content-Type': 'text/json',
  },
  statusCode: 200,
};

describe('fetch posts', () => {
  it('fetches successfully data from an API', async () => {
    const res = await handler({ headers: '', queryStringParameters: { limit: 1 } });
    expect(res.statusCode).toEqual(200);
  });
  it('overrides invalid limit', async () => {
    const res = await handler({ headers: '', queryStringParameters: { limit: 101 } });
    expect(JSON.parse(res.body).length).toEqual(10);
  });
  it('fetches data with starting_from applied', async () => {
    const res = await handler({
      headers: '',
      queryStringParameters: { starting_from: 2, limit: 1 },
    });
    expect(JSON.parse(res.body).length).toEqual(1);
    expect(JSON.parse(res.body)).toStrictEqual([
      {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body:
          'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
      },
    ]);
  });
});
