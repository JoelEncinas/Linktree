import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container } from "reactstrap";
import UserNotFound from "./UserNotFound";

function User() {
  const navigate = useNavigate();

  const { user } = useParams();

  const [userData, setUserData] = useState(null);
  const [userFound, setUserFound] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/${user}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setUserFound(true);
        setUserData(data.user);
      } else if (response.status === 404) {
        setUserFound(false);
        setUserData("");
      }
    }
    fetchUserData();
  }, [user, navigate]);

  if (userData === null) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {userFound === false ? (
        <UserNotFound />
      ) : (
        <Container
          className="mx-auto mt-4 text-center"
          style={{ maxWidth: 992 }}
        >
          <h1 className="display-1">{userData.username}</h1>
          {userData.links ? <p>Links</p> : <p>No links created yet</p>}
        </Container>
      )}
    </>
  );
}

export default User;
