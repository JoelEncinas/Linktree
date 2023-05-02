import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotLoggedNavbar from "./NotLoggedNavbar";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import useProtectedRoute from "../hooks/useProtectedRoute";

function Login() {
  useProtectedRoute();

  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "" });

  const [submitted, setSubmitted] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setSubmitted(false);
    setInvalidCredentials(false);
    setUserNotFound(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    setSubmitted(true);

    const user = {
      username: values.username,
      password: values.password,
    };

    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log("logged in");
            document.cookie = `token=${data.token}; expires=${new Date(
              Date.now() + 86400000
            )}; path=/`;
            navigate("/protected");
          });
        } else if (res.status === 401) {
          setInvalidCredentials(true);
        } else if (res.status === 404) {
          setUserNotFound(true);
        } else if (res.status === 500) {
          console.log("server err");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <NotLoggedNavbar />
      <Container className="mx-auto" style={{ maxWidth: 400 }}>
        <h1 className="text-center">Login</h1>
        <Form className="d-flex flex-column" onSubmit={handleLogin}>
          <FormGroup
            className={submitted && userNotFound ? "has-danger" : ""}
            floating
          >
            <Input
              className={submitted && userNotFound ? "is-invalid" : ""}
              required
              type="text"
              value={values.username}
              placeholder="Username"
              onChange={handleInputChange}
              id="username"
              name="username"
            />
            <Label for="username">Username</Label>
            {submitted && userNotFound && (
              <div className="invalid-feedback">Username not found.</div>
            )}
          </FormGroup>
          <FormGroup
            className={submitted && invalidCredentials ? "has-danger" : ""}
            floating
          >
            <Input
              className={submitted && invalidCredentials ? "is-invalid" : ""}
              required
              type="password"
              value={values.password}
              placeholder="Password"
              onChange={handleInputChange}
              id="password"
              name="password"
            />
            <Label for="password">Password</Label>
            {submitted && invalidCredentials && (
              <div className="invalid-feedback">Invalid credentials.</div>
            )}
          </FormGroup>

          <Button
            type="submit"
            color="primary"
            className="mx-auto"
            style={{ width: 100 }}
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
