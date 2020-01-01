import { Route, Switch } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import useAxios from './lib/useAxios';

import './App.css';
import { Error as ErrorPage, Header, Loading } from './components';
import { About, Post } from './pages';

/*

Theme stuff:
body text: #032d4d;
link hover: hsla(205.9, 85.3%, 40%, 1);
logo color: #054B81;
text-underline: hsla(205.9, 92.3%, 40%, 0.5);
darker-blue: color: #021728;

font-families?
box-shadows?

darkmode lightmode?

*/

const AppWrapper = styled.div`
  text-align: center;
  color: #032d4d;
  font-family: 'Work Sans';

  .footer {
    opacity: 0;
    padding: 5px 0 5px 0;
    display: flex;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: 0.7em;
    font-family: 'Lekton', monospace;
    text-transform: uppercase;
    animation: fadein 1s;
    animation-delay: 3s;
    animation-fill-mode: forwards;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/*
The same Grid component is serverd for both the root route and for the /posts/:id route
This is so that, when a post is clicked, we can render the individual post modal above 
the rest of the posts AND update the url at the same time.
Routing to the individual post is easy but we would wouldn't be able to have modal appear
ABOVE the existing post grid.

Issues: How we do serve 404 whne a visit to /post/:id isn't a valid post?

*/

function App() {
  const url = {
    url: '/.netlify/functions/posts-fetch-all-mock',
  };

  const { data: posts, loading, error } = useAxios(url);

  return (
    <AppWrapper>
      <Header />
      <div>
        <Switch>
          <Route exact path="/">
            <Posts posts={posts} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <ErrorPage error={{ code: 404, msg: 'Page not found!' }} />
          </Route>
        </Switch>
      </div>
      <div className="footer">Copyright 2019 © yoursite</div>
    </AppWrapper>
  );
}

function Posts({ posts }) {
  return (
    <StyledPosts>
      {posts ? posts.map(post => <Post key={post.id} {...post} />) : 'Loading'}
    </StyledPosts>
  );
}

/*
Tests:
* check that error renders error comp
* check that loading renders loading comp
*/
// function Post({ id, title, userId, body }) {
//   const { data: user, loading, error } = useAxios({
//     url: `/.netlify/functions/users-fetch-mock/${userId}`,
//   });

//   if (error) {
//     return <h3>Error loading post!</h3>;
//   }
//   if (loading) {
//     return <Loading />;
//   }
//   return (
//     <StyledPost>
//       <h2>{title}</h2>
//       <h4>— by {user.name}</h4>
//       {/* <p>{body}</p> */}
//     </StyledPost>
//   );
// }

const StyledPosts = styled.div`
  /* text-align: left; */
  max-width: 600px;
  margin: 0 auto;
`;

const StyledPost = styled.div`
  text-align: left;
  line-height: 1.6em;
  margin-bottom: 3em;
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

export default App;
