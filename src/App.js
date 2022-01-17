import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ArticlePage from "./pages/ArticlePage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PostPage from "./pages/PostPage";
import { getUser } from "./redux/reducers/userReducer";
import { useDispatch } from "react-redux";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Root>
      <Router>
        <Header>Header</Header>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/posts/:postID">
            <ArticlePage />
          </Route>
          <Route path="/new-post">
            <PostPage />
          </Route>
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
