import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useAxios } from '../lib/useAxios';

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

/*
Note:

Removed useAxios / useAxiosAsync altogether.
Function below replaces them
That way,  we don't need two different components both fetching

Would be nice to use reduecers for each slice of state
*/

export const PostPage: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let { id } = useParams();

  const { data: postData } = useAxios({
    url: `/.netlify/functions/posts-fetch-one/${id}`,
    options: {
      params: {
        ID: 12345,
      },
    },
  });

  const { data: authorData } = useAxios({
    url: postData ? `/.netlify/functions/users-fetch-one/${postData.userId}` : null,
  });

  return (
    <StyledPost>
      {postData ? (
        <>
          <h1>
            <Link to={`/posts/${postData.id}`}>{postData.title}</Link>
          </h1>
          <h4>— by {authorData ? authorData.name : 'Loading'}</h4>
          {/* <AuthorInfo userId={post.userId} /> */}
          <p>{postData.body}</p>
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

export default PostPage;
