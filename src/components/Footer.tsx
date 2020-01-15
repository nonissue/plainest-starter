import React from 'react';
import styled from 'styled-components';

export const Footer: React.FC = () => {
  return <FooterWrapper>Copyright 2019 © yoursite</FooterWrapper>;
};

const FooterWrapper = styled.div`
  a {
    text-decoration: none;
    color: #333;
  }

  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;

  opacity: 0;
  /* padding: 5px 0 5px 0; */
  display: flex;
  justify-content: center;
  /* margin-top: 2em; */
  /* margin-bottom: 2em; */
  font-size: 0.7em;
  font-family: ${props => props.theme.fonts.mono};
  text-transform: uppercase;
  animation: fadein 1s;
  animation-delay: 1s;
  animation-fill-mode: forwards;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default Footer;
