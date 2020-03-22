import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Form, Container, Grid } from "semantic-ui-react";
import useForm from "../utils/useForm";

import { UserContext } from "../context/UserContext";
import { REGISTER_USER_MUTATION } from "../utils/graphql";

export default function Register(props) {
  const context = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [register, handleRegister] = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: register
  });
  const onSubmit = e => {
    e.preventDefault();
    setErrors({});
    registerUser();
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
              <h1 style={{ textAlign: "center" }}>Register Here:</h1>
              <Container style={{ width: "80%", marginTop: "10px" }}>
                <Form.Input
                  type="text"
                  label="Username:"
                  placeholder="Username.."
                  name="username"
                  value={register.username}
                  onChange={handleRegister}
                  error={errors.username ? true : false}
                />
                <Form.Input
                  type="email"
                  label="Email:"
                  placeholder="Email.."
                  name="email"
                  value={register.email}
                  onChange={handleRegister}
                  error={errors.email ? true : false}
                />
                <Form.Input
                  type="password"
                  label="Password:"
                  placeholder="Password.."
                  name="password"
                  value={register.password}
                  onChange={handleRegister}
                  error={errors.password ? true : false}
                />
                <Form.Input
                  type="password"
                  label="Confirm password:"
                  placeholder="Password again.."
                  name="confirmPassword"
                  value={register.confirmPassword}
                  onChange={handleRegister}
                  error={errors.confirmPassword ? true : false}
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
