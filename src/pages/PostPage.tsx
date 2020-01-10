import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAxiosAsync } from '../lib/useAxios';

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
(data, loading, error). But then do we really need that since we are only 
rendering one discrete component?

*/

const AuthorInfo: React.FC<{ userId: number }> = ({ userId }) => {
  // const { data: authorRes } = useAxiosAsync(`/.netlify/functions/users-fetch-one/${userId}}`);
  const { data: authorRes, loading, error } = useAxiosAsync({
    url: `/.netlify/functions/users-fetch-one/${userId}`,
  });

  if (error) {
    return (
      <>
        <h4>— Error fetching author!</h4>
      </>
    );
  }

  if (loading) {
    return <>Loading</>;
  }

  return (
    <>
      <h4>— by {authorRes ? authorRes.name : 'Loading'}</h4>
    </>
  );
};

export const PostPage: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let { id } = useParams();
  const [post, setPost] = useState<PostState>();
  // const [author, setAuthor] = useState<AuthorState>();
  // console.log(postTest);
  // const { data: userTest } = useAxiosAsync(
  //   `/.netlify/functions/users-fetch-one/${postTest.userId || 1}`,
  // );

  // console.log(userTest);
  useEffect(() => {
    async function getData(url: string) {
      const fetchedData = await axios.get(url);
      return fetchedData;
    }

    async function init() {
      // will this data fetching cause race conditions?
      // also/related: handle unsub/cleanup?
      const { data: postRes } = await getData(`/.netlify/functions/posts-fetch-one/${id}`);

      // setAuthor(authorRes);
      setPost(postRes);
      // console.log(postRes);
    }
    init();
  }, [id]);

  return (
    <StyledPost>
      {post ? (
        <>
          <h1>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h1>
          <AuthorInfo userId={post.userId} />
          <p>{post.body}</p>
        </>
      ) : (
        <>Loading</>
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
