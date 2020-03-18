import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAxios } from '../lib/useAxios';
import { Loading } from '../components/Loading';

import { PostsListItem } from './PostsListItem';

interface Response {
  loading: boolean;
  error: { code?: number; msg?: string };
}

// FIXME
interface Post extends Response {
  data: any;
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

type PostState = {
  title: string;
  id: number;
  body: string;
  userId: number;
};

type AuthorState = {
  name: string;
};

export const UserPage: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let { id } = useParams();

  const author = {} as Author;
  const posts = {} as Post;

  ({ data: author.data, loading: author.loading, error: author.error } = useAxios({
    url: `/.netlify/functions/users-fetch-one/${id}`,
  }));

  ({ data: posts.data, loading: posts.loading, error: posts.error } = useAxios({
    url: '/.netlify/functions/posts-fetch-all-mock',
  }));

  let userPosts = null;
  if (posts.data) {
    userPosts = posts.data.filter((post: any) => post.userId === Number(id));
  }

  if (author.loading) {
    return <Loading />;
  }

  return (
    <StyledUser>
      {author.data ? (
        <>
          <div>
            <h3>{author.data.name}</h3>

            <ul>
              <li>
                <i>Email:</i> {author.data.email}
              </li>
              <li>
                <i>Website:</i> {`http://${author.data.website}`}
              </li>
            </ul>
          </div>
          <div className="users-posts">
            <hr />
            <h5>Posts by {author.data.name}</h5>
            {userPosts ? (
              userPosts.map((post: any) => (
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                <PostsListItem key={post.id} {...post} />
              ))
            ) : (
              <>
                {/* <Loading /> */}
                Loading
              </>
            )}
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </StyledUser>
  );
};

const StyledUser = styled.div`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 3em;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 1.25em;
  box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.1), 0 1.8px 2.3px rgba(0, 0, 0, 0.029),
    0 3.4px 4.4px rgba(0, 0, 0, 0.024), 0 6px 7.8px rgba(0, 0, 0, 0.02);
  border: 0.5px solid #e2e8f0;
  background: #fff;
  padding: 1em;

  .users-posts {
    max-width: 600px;
    h5 {
      font-size: 1em;
      text-align: center;
    }
    hr {
      border: 0;
      height: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }

  ul {
    /* margin: 0; */
    padding: 0;
    list-style-type: none;
  }
  li {
    font-family: ${props => props.theme.fonts.body};

    i {
      font-family: ${props => props.theme.fonts.mono};
      font-style: normal;
      text-transform: uppercase;
      font-size: 1em;
      color: #718096;
      letter-spacing: 0.05em;
    }
  }

  h1 {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 1.2em;
    margin-bottom: 0.2em;
    letter-spacing: -0.03em;
    text-align: left;
  }
  h3 {
    margin-top: 0;
    /* color: #a0aec0; */
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

export default UserPage;
