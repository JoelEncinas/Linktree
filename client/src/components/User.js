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
      } else if (response.status === 400) {
        navigate("/admin");
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
        <div id="user-content">
          <Container
            id="user-content-main"
            className="mx-auto pt-4 text-center"
            style={{ maxWidth: 992 }}
          >
            <h1 className="h1 pb-2">{userData.username}</h1>
            {userData.links ? (
              <p>Links</p>
            ) : (
              <p className="fst-italic mb-5">No links created yet...</p>
            )}
          </Container>
          <footer className="text-center py-2">
            <Link className="h3" style={{ textDecoration: "none" }} to="/">
              DevTree
            </Link>
          </footer>
        </div>
      )}
    </>
  );
}

export default User;
