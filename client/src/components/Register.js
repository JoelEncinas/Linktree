import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

function Register() {
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
          navigate("/login");
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

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        fetch(`${process.env.REACT_APP_API_URL}/protected`, {
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
      <h1 className="text-center">Register</h1>
      <Container className="mx-auto" style={{ maxWidth: 400 }}>
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
      </Container>
    </Container>
  );
}

export default Register;
