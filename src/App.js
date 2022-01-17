import React, { useEffect, useState } from "react";
import { AuthContext } from "./contexts";
import styled from "styled-components";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ArticlePage from "./pages/ArticlePage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { getMe } from "./WebAPI";
import { getAuthToken } from "./utils";
import PostPage from "./pages/PostPage";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getAuthToken() !== "null") {
      getMe().then((response) => {
        if (response.ok === 1) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
    </AuthContext.Provider>
  );
}

export default App;