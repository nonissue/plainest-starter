import React from 'react';
import styled from 'styled-components';
import { useAxios } from '../lib/useAxios';
import { Loading } from '../components';

type Post = {
  title: string;
  id: number;
  body: string;
  userId: number;
};

export const UsersList: React.FC = () => {
  const url = {
    url: '/.netlify/functions/users-fetch-all',
  };

  const { data: users, loading, error } = useAxios(url);

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <StyledUsers>
      {!loading ? (
        users.map((user: any) => (
          <div key={user.id}>
            <p>
              <b>{user.name}</b>
            </p>
            <p>{user.email}</p>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </StyledUsers>
  );
};

const StyledUsers = styled.div`
  max-width: 600px;
  margin: 0 auto;
  a {
    background: orange;
  }

  /* div:first-child {
    margin-bottom: 4em;
    h2 {
      font-size: 2.5em;
      font-weight: 800;
      line-height: 1.2em;
      text-align: center;
      letter-spacing: -0.02em;
      max-width: 100%;
    }
    h4 {
      text-align: center;
      margin-left: 0;
      margin-top: 1em;
      font-size: 1.2em;
    }
  } */
`;

export default UsersList;
