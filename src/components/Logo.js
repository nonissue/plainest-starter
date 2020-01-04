import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <LogoWrapper>
      <>
        <h1>
          <Link to="/">Starter</Link>
        </h1>
        <h3>
          <a href="https://instagram.com/yourinstagram">yourinstagram</a>
        </h3>
      </>
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  font-display: block;
  padding: 3vh 8px 3vh 1vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;

  a,
  a:link,
  a:visited {
    color: #032d4d;
    text-decoration: none;
    transition: all 0.2s ease-out;
  }

  a:hover {
    color: hsla(205.9, 85.3%, 40%, 1);
  }

  h1 {
    margin: 0;
    font-size: 1.2em;
    text-transform: uppercase;
    font-family: 'Bebas Neue', 'Helvetica', sans-serif;
    font-weight: 400;
    color: #fff;
  }

  h3 {
    margin-top: 0em;
    margin-bottom: 0em;
    margin-left: 0.1em;
    font-family: 'Lekton', sans-serif;
    font-weight: 300;
    font-size: 0.6em;
    text-decoration: underline;
    text-decoration-color: hsla(205.9, 92.3%, 40%, 0.5);
    text-underline-offset: 0.1rem;
  }

  h3::before {
    content: '@';
    font-family: 'Lekton', sans-serif;
    font-weight: 500;
    text-decoration-color: transparent;
    text-decoration: none;
    /* for some reason this removes the underline, which i want */
    display: inline-block;
    color: #9cb6c9;
    margin-right: 0.1em;
  }
`;

export default Logo;
