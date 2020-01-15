import React from 'react';
import styled from 'styled-components';

type ErrorType = { code?: number; msg?: string };

export const Error = ({ msg = 'An unknown error has occured.', code = 500 }: ErrorType) => (
  <StyledError>
    <h2>ERROR: {code}</h2>
    <h4>{msg}</h4>
    <p>
      Notify <a href="mailto:andy@nonissue.org">support</a>.
    </p>
    <div className="kirby">¯\_(ツ)_/¯</div>
  </StyledError>
);

const StyledError = styled.div`
  max-width: 700px;
  margin: 0 auto;
  top: 0;

  h2 {
    font-weight: 800;
    color: #e53e3e;
  }

  h4 {
    font-weight: 400;
    font-size: 2em;
    line-height: 1.5em;
  }
  .kirby {
    color: #a0aec0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1em;
    text-align: center;
  }

  a {
    font-weight: bold;
  }
`;
