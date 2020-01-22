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
  const url = {
    url: '/.netlify/functions/posts?with_users=1',
  };

  const { data: posts, loading, error } = useAxios(url);

  // console.log(posts);
  // const { data } = useAxios(url);

  // if (data) {
  //   console.log(data);
  // }

  // let shuffledPosts;

  // if (posts) {
  //   shuffledPosts = shuffle(posts).slice(0, 15);
  //   console.log(shuffledPosts);
  // }

  // let shuffledPosts = posts;

  if (error) {
    return <div>Error!</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <StyledPosts>
      {posts &&
        posts.map((post: Post) => <PostsListItem key={post.id} user={post.user} {...post} />)}
    </StyledPosts>
  );
};

const StyledPosts = styled.div`
  max-width: 800px;
  margin: 0 auto;

  article:first-child {
    max-width: 700px;
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
      font-size: 1.2em;
    }
  }
`;

export default PostsList;
