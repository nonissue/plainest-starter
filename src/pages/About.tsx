import React from 'react';
import styled from 'styled-components';

export const About: React.FC = () => {
  return (
    <AboutWrapper>
      <div className="about">
        <h1>About</h1>
        <p>
          &quot;Boring photos of buildings&quot; <i>aka</i> &quot;A kuest for klout™️&quot; cooked
          up sporadically by &nbsp;
          <a href="https://www.instagram.com/christiandy/">@christiandy</a> &&&nbsp;
          <a href="https://www.instagram.com/christiandy/">@nonissue</a>
        </p>
      </div>
    </AboutWrapper>
  );
};

const AboutWrapper = styled.div`
  color: #032d4d;
  width: 50vw;
  margin: 0px auto;
  padding-top: 5vw;
  max-width: 700px;
  font-family: ${props => props.theme.fonts.body};

  text-align: center;
  /* font-family: 'Lekton', monospace; */

  i {
    /* font-weight: 300; */
    font-family: ${props => props.theme.fonts.mono};
  }
  p {
    font-size: 2em;
    line-height: 1.5em;
  }
  h1 {
    /* font-family: 'Bebas Neue', 'Helvetica', sans-serif; */
    font-weight: 800;
    /* letter-spacing: 0.1em; */
    font-size: 3em;

    text-align: center;
  }

  b {
    font-style: normal;
    font-family: ${props => props.theme.fonts.mono};
    text-transform: uppercase;
    font-weight: 600;
  }

  a:link,
  a:visited {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: hsla(205.9, 92.3%, 40%, 0.5);
    text-underline-offset: 0.1rem;
    font-weight: 700;
    transition: all 0.1s ease-out;
  }

  a:hover {
    color: #fa6400;
    color: hsla(205.9, 85.3%, 40%, 1);
    text-decoration-color: transparent;
  }
`;

export default About;
