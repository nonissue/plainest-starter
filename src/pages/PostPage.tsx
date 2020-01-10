import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
      <h4>by {authorRes ? authorRes.name : 'Loading'}</h4>
    </>
  );
};

export const PostPage: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let { id } = useParams();
  // const [post, setPost] = useState<PostState>();

  const { data: post, loading, error } = useAxiosAsync({
    url: `/.netlify/functions/posts-fetch-one/${id}`,
  });

  console.log('Post: ' + post);

  // useEffect(() => {
  //   async function getData(url: string) {
  //     const fetchedData = await axios.get(url);
  //     return fetchedData;
  //   }

  //   async function init() {
  //     // will this data fetching cause race conditions?
  //     // also/related: handle unsub/cleanup?
  //     const { data: res } = await getData(`/.netlify/functions/posts-fetch-one/${id}`);

  //     // setAuthor(authorRes);
  //     // setPost(postRes);
  //     // console.log(postRes);
  //   }
  //   init();
  // }, [id]);

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
        <>Loading...</>
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
  h1 {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 1.2em;
    margin-bottom: 0.2em;
    letter-spacing: -0.03em;
    text-align: left;
  }
  h4 {
    font-weight: 300;
    text-transform: uppercase;
    padding: 0;
    margin: 0;
    color: #555;
    margin-left: 0.5em;
    text-align: left;
  }
  p {
    font-size: 0.95em;
    line-height: 1.6em;

    :first-letter {
      text-transform: capitalize;
    }
    :after {
      content: '.';
    }
  }
`;

AuthorInfo.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default PostPage;
