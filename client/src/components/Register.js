import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch("http://127.0.0.1:4997/auth/register", {
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
          console.log("username taken");
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
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Register</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        ></input>
        <input type="submit" value="Register"></input>
      </form>
    </div>
  );
}

export default Register;
