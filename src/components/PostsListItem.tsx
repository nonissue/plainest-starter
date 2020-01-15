import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAxios } from '../lib/useAxios';

/*
Tests:
* check that error renders error comp
* check that loading renders loading comp

TODO: 
* This fetches data, should all data fetching components be separated?
*/
type PostProps = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

export const PostsListItem: React.FC<PostProps> = ({ id, title, userId }: PostProps) => {
  const { data: user, loading, error } = useAxios({
    url: `/.netlify/functions/users-fetch-one/${userId}`,
  });

  if (error) {
    return <h3>Error loading post!</h3>;
  }
  if (loading) {
    return <></>;
  }
  return (
    <StyledPost>
      <h2>
        {/* <span style={{ padding: '0.5em', border: '1px solid #333' }}> */}{' '}
        <Link to={`/posts/${id}`}>{title}</Link>
        {/* </span> */}
      </h2>
      <h4>
        — <Link to={`/users/${user.id}`}>{user.name}</Link>
      </h4>
    </StyledPost>
  );
};

const StyledPost = styled.div`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 1.25em;
  background: #ed8936;
  border-radius: 0.5em;
  box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.1), 0 1.8px 2.3px rgba(0, 0, 0, 0.029),
    0 3.4px 4.4px rgba(0, 0, 0, 0.024), 0 6px 7.8px rgba(0, 0, 0, 0.02),
    0 11.3px 14.6px rgba(0, 0, 0, 0.016), 0 27px 35px rgba(0, 0, 0, 0.011);
  box-shadow: 0 1.3px 0.7px rgba(0, 0, 0, 0.07), 0 3.2px 3.7px rgba(0, 0, 0, 0.039),
    0 6px 10.3px rgba(0, 0, 0, 0.028), 0 10.7px 23.1px rgba(0, 0, 0, 0.022),
    0 20.1px 49px rgba(0, 0, 0, 0.017), 0 48px 120px rgba(0, 0, 0, 0.012);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* box-shadow: 0 1.3px 0.7px rgba(0, 0, 0, 0.15), 0 3.2px 3.7px rgba(0, 0, 0, 0.05),
    0 6px 10.3px rgba(0, 0, 0, 0.028), 0 10.7px 23.1px rgba(0, 0, 0, 0.022); */
  /* box-shadow: 0 1.2px 2.2px rgba(0, 0, 0, 0.04), 0 2.9px 5.3px rgba(0, 0, 0, 0.029),
    0 5.4px 10px rgba(0, 0, 0, 0.024), 0 9.6px 17.9px rgba(0, 0, 0, 0.02),
    0 18px 33.4px rgba(0, 0, 0, 0.016), 0 43px 80px rgba(0, 0, 0, 0.011); */
  /* box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.07), 0 6.7px 5.3px rgba(0, 0, 0, 0.05),
    0 12.5px 10px rgba(0, 0, 0, 0.042), 0 22.3px 17.9px rgba(0, 0, 0, 0.035),
    0 41.8px 33.4px rgba(0, 0, 0, 0.028), 0 100px 80px rgba(0, 0, 0, 0.02); */
  /* box-shadow: 0 0.7px 1.3px -1px rgba(0, 0, 0, 0.07), 0 1.7px 2.9px -1px rgba(0, 0, 0, 0.053),
    0 2.9px 5px -1px rgba(0, 0, 0, 0.046), 0 4.6px 7.9px -1px rgba(0, 0, 0, 0.04),
    0 7.1px 12.2px -1px rgba(0, 0, 0, 0.035), 0 11.2px 19px -1px rgba(0, 0, 0, 0.03),
    0 18.5px 31.5px -1px rgba(0, 0, 0, 0.024), 0 37px 63px -1px rgba(0, 0, 0, 0.017); */
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); */

  padding: 1em;
  a {
    /* background: orange; */
    padding: 0 0em;
    /* line-height: 1.5em; */
    -webkit-box-decoration-break: clone;
    -ms-box-decoration-break: clone;
    -o-box-decoration-break: clone;
    box-decoration-break: clone;
    /* border-bottom: 2px solid #333; */
  }

  h2 {
    font-weight: 700;
    font-size: 1.7em;
    /* max-width: 85%; */
    margin-top: 0;
    /* padding: 0.2em 0em; */
    /* padding: 1em; */
    text-transform: capitalize;
    line-height: 1.22em;
    margin-bottom: 0;
    letter-spacing: -0.03em;
  }
  h4 {
    font-weight: 400;
    text-transform: uppercase;
    padding: 0;
    /* font-size: 1em; */
    margin: 0;
    color: #fffaf0;
    /* text-align: right; */
    /* padding: 1em; */

    a {
      background: transparent;
      font-family: ${props => props.theme.fonts.body};

      font-weight: 400;
      box-shadow: none;
      border: none;
      color: #fffaf0;
      /* border-radius: 0.25em;
      padding: 0.1em 0.2em; */
    }
  }
  p {
    font-size: 0.95em;
  }
`;

export default PostsListItem;
