import React from 'react';
import styled from 'styled-components';
import { useAxiosAsync } from '../lib/useAxios';
import { Loading, PostsListItem } from '../components';

type Post = {
  title: string;
  id: number;
  body: string;
  userId: number;
};

export const PostsList: React.FC = () => {
  const url = {
    url: '/.netlify/functions/posts-fetch-all-mock',
  };

  const { data: posts, loading, error } = useAxiosAsync(url);

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <StyledPosts>
      {!loading ? (
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        posts.map((post: Post) => <PostsListItem key={post.id} {...post} />)
      ) : (
        <Loading />
      )}
    </StyledPosts>
  );
};

const StyledPosts = styled.div`
  max-width: 600px;
  margin: 0 auto;

  div:first-child {
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
  }
`;

export default PostsList;
