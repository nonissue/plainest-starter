import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../lib/useAxios';

type PostState = {
  title: string;
  id: number;
  body: string;
  userId: number;
};

type AuthorState = {
  name: string;
};

/* 
Issue: 
We don't know the userId until we've fetched the post successfully
Once we get the userId, we can fetch the user data. So we have to
await the post data? 
So we have to make useAxios an async hook right?

It is nice that the useAxios hook returns a structured object of state
(data, loading, error)

*/

export const PostPage: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let { id } = useParams();
  const [post, setPost] = useState<PostState>();
  const [author, setAuthor] = useState<AuthorState>();

  useEffect(() => {
    async function getData(url: string) {
      const fetchedData = await axios.get(url);
      return fetchedData;
    }

    async function init() {
      // will this data fetching cause race conditions?
      // also/related: handle unsub/cleanup?
      const { data: postRes } = await getData(`/.netlify/functions/posts-fetch-one/${id}`);
      const { data: authorRes } = await getData(
        `/.netlify/functions/users-fetch-one/${postRes.userId}`,
      );

      setAuthor(authorRes);
      setPost(postRes);
    }
    init();
  }, [id]);

  return (
    <StyledPost>
      {post && author ? (
        <>
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <h4>— by {author ? author.name : 'Loading'}</h4>
          <p>{post.body}</p>
        </>
      ) : (
        <></>
      )}
    </StyledPost>
  );
};

const StyledPost = styled.div`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 3em;
  max-width: 600px;
  margin: 0 auto;
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

export default PostPage;
