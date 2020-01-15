import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineLeft as Back, AiOutlineQuestionCircle as Question } from 'react-icons/ai';

import { Logo } from './Logo';

export function Header() {
  const location = useLocation();
  return (
    <StyledHeader>
      {!(location.pathname === '/') ? (
        <div className="control">
          <Link to="/">
            <Back />
          </Link>
        </div>
      ) : (
        <div className="control hidden">
          <Back />
        </div>
      )}

      <Logo showImage={false} />

      {!(location.pathname === '/about') ? (
        <div className="control">
          <Link to="/about">
            <Question />
          </Link>
        </div>
      ) : (
        <div className="control hidden">
          <Question />
        </div>
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;

  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  animation: fadein 0.3s;
  font-size: calc(12px + 1.5vmin);
  border: 0px solid #ccc;
  border-left: 0;
  border-right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  .control {
    text-transform: uppercase;
    font-size: 0.7em;
    font-family: ${props => props.theme.fonts.mono};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2em;
    margin-right: 2em;

    a,
    a:link,
    a:visited {
      color: #aaa;
      opacity: 9;
      text-decoration: none;
      transition: color 0.2s ease-out;
    }

    a:hover {
      opacity: 1;
      color: #0f72bd;
    }
  }
  .hidden {
    visibility: hidden;
  }

  @media only screen and (max-width: 700px) {
    .control a {
      font-size: 1.5em;
    }
  }
`;

export default Header;
