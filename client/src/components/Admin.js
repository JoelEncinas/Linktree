import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUserName] = useState(null);
  const [bioValue, setBioValue] = useState("");
  const [counter, setCounter] = useState(0);

  function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/auth/login");
  }

  useEffect(() => {
    if (location.state && location.state.data) {
      const data = location.state.data;
      setUserName(data.username);
      console.log(data);
    } else {
      navigate("/auth/login");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    setCounter(bioValue.length);
  }, [bioValue]);

  function handleInputChange(e) {
    console.log(e)
    const value = e.target.value;
    setBioValue(value);
  }

  function handleProfile() {
    // TODO
  }

  return (
    <>
      <button onClick={logout}>Logout</button>
      <Container className="mx-auto" style={{ maxWidth: 400 }}>
        <h1 className="text-center">Profile</h1>
        <Form className="d-flex flex-column" onSubmit={handleProfile}>
          <FormGroup row floating>
            <Input
              required
              type="textarea"
              value={bioValue}
              placeholder="Password"
              onChange={handleInputChange}
              id="bio"
              name="bio"
              maxLength={90}
              style={{height: 105}}
            />
            <Label for="bio">Bio</Label>
            <span>{counter}/90</span>
          </FormGroup>

          <Button
            type="submit"
            color="primary"
            className="mx-auto"
            style={{ width: 100 }}
          >
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Admin;
