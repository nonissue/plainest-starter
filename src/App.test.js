import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';

const link = `
  color: 'hsla(205.9, 85.3%, 40%, 1)';
  text-decoration: none;

`;

const themes = {
  light: {
    background: '#ffffff',
    foreground: '#191b24',
    text: '#191b24',
    font: `'Work Sans', 'Helvetica Neue', 'Helvetica', Arial, sans-serif`,
    link,
    fonts: {
      body: `'Work Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
      mono: `'Lekton', Monaco, 'Lucida Console',  monospace`,
      header: `'Bebas Neue', 'Work Sans', Helvetica, sans-serif`,
    },
  },
  dark: {
    background: '#333333',
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router initialEntries={['./']}>
      <ThemeProvider theme={themes.light}>
        <App />
      </ThemeProvider>
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
