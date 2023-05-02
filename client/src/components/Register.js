import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NotLoggedNavbar from "./NotLoggedNavbar";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import useProtectedRoute from "../hooks/useProtectedRoute";

function Register() {
  useProtectedRoute();

  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "" });

  const [submitted, setSubmitted] = useState(false);
  const [userTaken, setUserTaken] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setSubmitted(false);
    setUserTaken(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const user = {
      username: values.username,
      password: values.password,
    };

    fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 201) {
          console.log("register OK");
          navigate("/auth/login");
        } else if (res.status === 409) {
          setUserTaken(true);
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
        <h1 className="text-center">Register</h1>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <FormGroup
            className={submitted && userTaken ? "has-danger" : ""}
            floating
          >
            <Input
              className={submitted && userTaken ? "is-invalid" : ""}
              required
              type="text"
              value={values.username}
              placeholder="Username"
              onChange={handleInputChange}
              id="username"
              name="username"
            ></Input>
            <Label for="username">Username</Label>
            {submitted && userTaken && (
              <div className="invalid-feedback">
                Username taken, please enter a new one.
              </div>
            )}
          </FormGroup>
          <FormGroup floating>
            <Input
              required
              type="password"
              value={values.password}
              placeholder="Password"
              onChange={handleInputChange}
              id="password"
              name="password"
              minLength={4}
            ></Input>
            <Label for="password">Password</Label>
          </FormGroup>
          <Button
            type="submit"
            color="primary"
            className="mx-auto"
            style={{ width: 100 }}
          >
            Register
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/auth/login">Login</Link>
        </p>
      </Container>
    </>
  );
}

export default Register;
