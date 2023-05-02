import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";

function User() {
  const { user } = useParams();

  // todo call server
  // if user not found redirect to 400
  // else display user data
  const [userData, setUserData] = useState(null);



  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="mx-auto text-center" style={{ maxWidth: 992 }}>
        <h1 className="display-1">{user}</h1>
      </Container>
    </>
  );
}

export default User;
