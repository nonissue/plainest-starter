import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../About.tsx';

jest.mock('axios');

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<About />, div);
  ReactDOM.unmountComponentAtNode(div);
});
