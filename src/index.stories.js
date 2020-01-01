import React from 'react';
// import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './components';
import './index.css';

// import api from './utils/api.js';

export default { title: 'Homepage' };

export const HeaderComponent = () => (
  <MemoryRouter initialEntries={['/']}>
    <Header />
  </MemoryRouter>
);

// export const withText = () => <Button>Hello Button</Button>;

// export const withEmoji = () => (
//   <Button>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
