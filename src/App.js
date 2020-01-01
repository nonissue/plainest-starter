import { Route, Switch } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import useAxios from './lib/useAxios';

import './App.css';
import { Error as ErrorPage, Header, Loading, PostListItem } from './components';
import { About, PostPage } from './pages';

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

  a {
    text-decoration: none;
    color: #333;
  }

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
  return (
    <AppWrapper>
      <Header />
      <div>
        <Switch>
          <Route exact path="/">
            <Posts />
          </Route>
          <Route path="/posts/:id" component={PostPage}>
            <PostPage />
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

function Posts() {
  const url = {
    url: '/.netlify/functions/posts-fetch-all-mock',
  };

  const { data: posts, loading, error } = useAxios(url);

  if (error) {
    return 'Error!';
  }

  return (
    <StyledPosts>
      {!loading ? posts.map(post => <PostListItem key={post.id} {...post} />) : <Loading />}
    </StyledPosts>
  );
}

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
    }
    h4 {
      text-align: center;
      margin-left: 0;
      margin-top: 1em;
      font-size: 1.2em;
    }
  }
`;

export default App;
