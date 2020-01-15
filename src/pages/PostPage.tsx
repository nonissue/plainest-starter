import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useAxios } from '../lib/useAxios';
import { Loading, Error } from '../components';

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

interface Response {
  loading: boolean;
  error: { code?: number; msg?: string };
}

interface Post extends Response {
  data: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Author extends Response {
  data: {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  };
}

interface Error {
  code?: number;
  msg?: string;
}

/*
Tests:
- errors are handled correctly when returned from axios
- comment mounts
- figure out how to check for data racing conditions?
*/

export const PostPage: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let { id } = useParams();

  const post = {} as Post;
  const author = {} as Author;

  ({ data: post.data, loading: post.loading, error: post.error } = useAxios(
    {
      url: `/.netlify/functions/posts-fetch-one/${id}`,
    },
    { test: 'test', test2: 'test3' },
  ));

  ({ data: author.data, loading: author.loading, error: author.error } = useAxios({
    url: post.data ? `/.netlify/functions/users-fetch-one/${post.data.userId}` : null,
  }));

  if (post.error || author.error) {
    const error = post.error || author.error;
    return <Error code={error.code} msg={error.msg} />;
  }

  if (post.loading || author.loading) {
    return <Loading />;
  }

  return (
    <StyledPost>
      <>
        <h2>
          <Link to={`/posts/${post.data.id}`}>{post.data.title}</Link>
        </h2>
        <h4>
          — by <Link to={`/users/${author.data.id}`}>{author.data.name}</Link>
        </h4>
        <p>{`${post.data.body}`.repeat(2)}</p>
        <p>{`${post.data.body}`.repeat(3)}</p>
      </>
    </StyledPost>
  );
};

const StyledPost = styled.div`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 3em;
  max-width: 600px;
  margin: 0 auto;

  text-align: left;
  box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.1), 0 1.8px 2.3px rgba(0, 0, 0, 0.029),
    0 3.4px 4.4px rgba(0, 0, 0, 0.024), 0 6px 7.8px rgba(0, 0, 0, 0.02);
  border: 0.5px solid #e2e8f0;
  background: #fff;
  padding: 1em;

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
    /* color: #cbd5e0; */

    a {
      background: transparent;
      font-family: ${props => props.theme.fonts.body};
      /* font-weight: 500; */
      box-shadow: none;
      /* border: none; */
      color: #718096;
      color: #a0aec0;
    }
  }

  /* h1 {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 1.2em;
    margin-bottom: 0.2em;
    margin-top: 0em;
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
  } */
  p {
    font-size: 0.95em;
    line-height: 1.6em;
    margin-bottom: 0;

    :first-letter {
      text-transform: capitalize;
    }
    :after {
      content: '.';
    }
  }
`;

export default PostPage;
