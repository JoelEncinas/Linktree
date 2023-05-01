import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

function Login() {
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

    fetch("http://127.0.0.1:4997/auth/login", {
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

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        fetch("http://127.0.0.1:4997/protected", {
          headers: {
            "x-access-token": value,
          },
        })
          .then((res) => res.json())
          .then((data) => (data.isLoggedIn ? navigate("/protected") : null));
        break;
      }
    }
  }, [navigate]);

  return (
    <Container>
      <Navbar />
      <h1 className="text-center">Login</h1>
      <Container className="mx-auto" style={{ maxWidth: 400 }}>
        <Form className="d-flex flex-column">
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
            color="primary"
            className="mx-auto"
            style={{ width: 100 }}
            onClick={(event) => handleLogin(event)}
          >
            Login
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default Login;
