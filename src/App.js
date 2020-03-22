import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

import { UserProvider } from "./context/UserContext";
import AuthRedirect from "./utils/AuthRedirect";
import SinglePostPage from "./pages/SinglePostPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Container>
          <Header />
          <Route exact path="/" component={Home} />
          <AuthRedirect exact path="/login" component={Login} />
          <AuthRedirect exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePostPage} />
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
