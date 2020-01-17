import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAxios } from '../lib/useAxios';
import { Loading } from '../components/Loading';

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
  user: any;
};

export const PostsListItem: React.FC<PostProps> = ({ id, title, body, userId }: PostProps) => {
  // console.log('Post ' + id + ' rendering...');

  const { data: user, loading, error } = useAxios({
    url: `/.netlify/functions/users-fetch-one/${userId}`,
  });

  // console.log(`Post ${id} rendering. \nUser loaded: ${user ? 'true' : 'false'}`);
  // console.log(user);

  // const error = false;
  // const loading = false;

  if (error) {
    return <h3>Error loading post!</h3>;
  }
  if (loading) {
    return <></>;
  }
  return (
    <StyledPost>
      <>
        <h2>
          <Link to={`/posts/${id}`}>{title}</Link>
        </h2>
        <h4>
          — {loading ? 'Loading author name...' : <Link to={`/users/${user.id}`}>{user.name}</Link>}
        </h4>
        <p>{body}</p>
      </>
    </StyledPost>
  );
};

const StyledPost = styled.article`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 1.25em;
  box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.1), 0 1.8px 2.3px rgba(0, 0, 0, 0.029),
    0 3.4px 4.4px rgba(0, 0, 0, 0.024), 0 6px 7.8px rgba(0, 0, 0, 0.02);
  border: 0.5px solid #e2e8f0;
  background: #fff;
  padding: 1em;

  a {
    padding: 0 0em;
    color: #2d3748;
    -webkit-box-decoration-break: clone;
    -ms-box-decoration-break: clone;
    -o-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  h2 {
    font-weight: 700;
    font-size: 2em;

    margin-top: 0;
    margin-bottom: 0;
    margin-bottom: 0.25rem;
    text-transform: capitalize;
    line-height: 1.22em;

    letter-spacing: -0.03em;
    a {
      color: #2d3748;
    }
  }
  h4 {
    font-weight: 400;
    text-transform: uppercase;
    padding: 0;
    margin: 0;
    color: #cbd5e0;

    a {
      background: transparent;
      font-family: ${props => props.theme.fonts.body};
      font-weight: 300;
      box-shadow: none;
      border: none;
      color: #718096;
    }
  }
  p {
    font-size: 0.95em;
    padding: 0;
    margin: 0;
    margin-top: 0.5rem;
    ::first-letter {
      text-transform: capitalize;
    }
  }
`;

export default PostsListItem;
