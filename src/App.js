import { Route, Switch } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import './App.css';
import { Error as ErrorPage, Footer, Header } from './components';
import { About, PostsList, PostPage } from './pages';

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
            <PostsList />
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
      <Footer />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  text-align: center;
  /* color: #032d4d; */
  font-family: 'Work Sans', 'Helvetica Neue', 'Helvetica', Arial, sans-serif;

  a {
    text-decoration: none;
    color: #333;
  }
`;

export default App;
