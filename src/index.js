import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import history from './history'

// body text: #032d4d;
// link hover: hsla(205.9, 85.3%, 40%, 1);
// logo color: #054B81;
// text-underline: hsla(205.9, 92.3%, 40%, 0.5);
// darker-blue: color: #021728;

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
  },
  dark: {
    background: '#333333',
  },
};

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={themes.light}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
