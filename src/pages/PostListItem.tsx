import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    font-weight: 600;
    font-size: 1.2em;
    text-transform: capitalize;
    line-height: 1.5em;
    /* margin-bottom: 0.25em; */
    margin-bottom: 0;
    letter-spacing: -0.03em;
    max-width: 80%;
  }
  h4 {
    font-weight: 300;
    text-transform: uppercase;
    /* font-family: 'Lekton'; */
    padding: 0;
    font-size: 0.9em;
    margin: 0;
    color: #555;
    /* margin-left: 0.5em; */
  }
  p {
    font-size: 0.95em;
  }
`;

export const PostListItem: React.FC<PostProps> = ({ id, title, userId }: PostProps) => {
  const { data: user, loading, error } = useAxios({
    url: `/.netlify/functions/users-fetch-mock/${userId}`,
  });

  if (error) {
    return <h3>Error loading post!</h3>;
  }
  if (loading) {
    return <></>;
  }
  return (
    <StyledPost>
      <h2>
        <Link to={`/posts/${id}`}>{title}</Link>
      </h2>
      <h4>— by {user.name}</h4>
    </StyledPost>
  );
};

export default PostListItem;
