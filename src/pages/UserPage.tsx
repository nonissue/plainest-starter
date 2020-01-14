import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAxios } from '../lib/useAxios';

type PostState = {
  title: string;
  id: number;
  body: string;
  userId: number;
};

type AuthorState = {
  name: string;
};

export const UserPage: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let { id } = useParams();

  const { data: userData } = useAxios({
    url: `/.netlify/functions/users-fetch-one/${id}`,
  });

  return (
    <StyledUser>
      {userData ? (
        <div>
          <p>
            <b>{userData.name}</b>
          </p>
          <p>{userData.email}</p>
        </div>
      ) : (
        <>Loading...</>
      )}
    </StyledUser>
  );
};

const StyledUser = styled.div`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 3em;
  max-width: 600px;
  margin: 0 auto;

  h1 {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 1.2em;
    margin-bottom: 0.2em;
    letter-spacing: -0.03em;
    text-align: left;
  }
  h4 {
    font-weight: 300;
    text-transform: uppercase;
    padding: 0;
    margin: 0;
    color: #555;
    margin-left: 0.5em;
    text-align: left;
  }
  p {
    font-size: 0.95em;
    line-height: 1.6em;

    :first-letter {
      text-transform: capitalize;
    }
    :after {
      content: '.';
    }
  }
`;

export default UserPage;
