import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAxios } from '../lib/useAxios';

/*
Tests:
* check that error renders error comp
* check that loading renders loading comp

TODO: 
* This fetches data, should all data fetching components be separated?
*/
type PostProps = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

export const PostsListItem: React.FC<PostProps> = ({ id, title, userId }: PostProps) => {
  const { data: user, loading, error } = useAxios({
    url: `/.netlify/functions/users-fetch-one/${userId}`,
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
      <h4>
        — by
        <Link to={`/user/${user.id}`}> {user.name}</Link>
      </h4>
    </StyledPost>
  );
};

const StyledPost = styled.div`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 1.25em;

  h2 {
    font-weight: 600;
    font-size: 1.4em;
    max-width: 85%;
    text-transform: capitalize;
    line-height: 1.2em;
    margin-bottom: 0;
    letter-spacing: -0.03em;
  }
  h4 {
    font-weight: 300;
    text-transform: uppercase;
    padding: 0;
    font-size: 0.75em;
    margin: 0;
    color: #555;
  }
  p {
    font-size: 0.95em;
  }
`;

export default PostsListItem;
