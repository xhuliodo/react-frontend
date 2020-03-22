import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Form, Container, Grid } from "semantic-ui-react";
import useForm from "../utils/useForm";

import { UserContext } from "../context/UserContext";
import { LOGIN_USER_MUTATION } from "../utils/graphql";

export default function Login(props) {
  const context = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [login, handleLogin] = useForm({
    username: "",
    password: ""
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: login
  });
  const onSubmit = e => {
    e.preventDefault();
    setErrors({});
    loginUser();
  };
  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={15}>
            <Form
              onSubmit={onSubmit}
              className={loading ? "loading" : ""}
              noValidate
            >
              <h1 style={{ textAlign: "center" }}>Login Here:</h1>
              <Container style={{ width: "80%", marginTop: "10px" }}>
                <Form.Input
                  type="text"
                  label="Username:"
                  placeholder="Username.."
                  name="username"
                  value={login.username}
                  onChange={handleLogin}
                  error={errors.username ? true : false}
                />
                <Form.Input
                  type="password"
                  label="Password:"
                  placeholder="Password.."
                  name="password"
                  value={login.password}
                  onChange={handleLogin}
                  error={errors.password ? true : false}
                />
                <Form.Button type="submit" color="orange">
                  Submit
                </Form.Button>
              </Container>
            </Form>

            {Object.keys(errors).length > 0 && (
              <div className="ui error message">
                <ul>
                  {Object.values(errors).map(value => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
