import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAxios from '../lib/useAxios';

type PostProps = {
  id: number;
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

export const PostPage: React.FC<PostProps> = ({ id }: PostProps) => {
  const { data: post } = useAxios({
    url: `/.netlify/functions/posts-fetch-one/${id}`,
  });

  let userData;

  const fetchUserByPost = async (postId: number) => {
    // if (post) {
    const { data: user } = await axios(`/.netlify/functions/users-fetch-mock/${postId}`);
    // }
    return user;
  };

  if (post !== undefined) {
    userData = fetchUserByPost(id);
    console.log(userData);
  }

  // if (error) {
  //   return <h3>Error loading post!</h3>;
  // }
  // if (loading) {
  //   return <>Loading</>;
  // }
  return (
    <StyledPost>
      {post && userData && 'test'}
      {post ? (
        <>
          <h2>
            <Link to={`/posts/${id}`}>{post.title}</Link>
          </h2>
          <h4>— by {userData ? userData : 'Loading'}</h4>
          <p>{post.body}</p>
        </>
      ) : (
        'Loading'
      )}
    </StyledPost>
  );
};

export default PostPage;
