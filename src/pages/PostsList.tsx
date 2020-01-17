import React from 'react';
import styled from 'styled-components';
import { useAxios } from '../lib/useAxios';
import { shuffle } from '../utils/shuffle';
import { Loading } from '../components';
import { PostsListItem } from './PostsListItem';

type Post = {
  title: string;
  id: number;
  body: string;
  userId: number;
  user: any;
};

export const PostsList: React.FC = () => {
  console.log('rerender!');
  const url = {
    url: '/.netlify/functions/posts-fetch-all-mock',
  };

  const { data: posts, loading, error } = useAxios(url);
  const { data } = useAxios(url);

  // if (data) {
  //   console.log(data);
  // }

  let shuffledPosts;

  if (posts) {
    shuffledPosts = shuffle(posts).slice(0, 5);
    console.log(shuffledPosts);
  }

  if (error) {
    return <div>Error!</div>;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <StyledPosts>
      {shuffledPosts &&
        shuffledPosts.map((post: Post) => (
          <PostsListItem key={post.id} {...post} user={post.user} />
        ))}
    </StyledPosts>
  );
};

const StyledPosts = styled.div`
  max-width: 600px;
  margin: 0 auto;

  article:first-child {
    margin-bottom: 2em;
    margin-top: 2em;
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
      margin-top: 0.5em;
      margin-bottom: 1rem;
      font-size: 1.2em;
    }
  }
`;

export default PostsList;
