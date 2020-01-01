import React from 'react';
import styled from 'styled-components';
import useAxios from '../lib/useAxios';
// type AboutProps = { message: string }; /* could also use interface */

type PostProps = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

const StyledPost = styled.div`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 3em;
  h2 {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 1.3em;
    margin-bottom: 0.25em;
    letter-spacing: -0.03em;
    max-width: 80%;
  }
  h4 {
    font-weight: 400;
    text-transform: uppercase;
    font-family: 'Lekton';
    padding: 0;
    margin: 0;
    color: #555;
    margin-left: 0.5em;
  }
  p {
    font-size: 0.95em;
  }
`;

export const Post: React.FC<PostProps> = ({ id, title, userId, body }: PostProps) => {
  const { data: user, loading, error } = useAxios({
    url: `/.netlify/functions/users-fetch-mock/${userId}`,
  });

  if (error) {
    return <h3>Error loading post!</h3>;
  }
  if (loading) {
    return <>Loading</>;
  }
  return (
    <StyledPost>
      <h2>{title}</h2>
      <h4>— by {user.name}</h4>
      {/* <p>{body}</p> */}
    </StyledPost>
  );
};

export default Post;
