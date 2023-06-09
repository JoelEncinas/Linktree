import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import UserNotFound from "./UserNotFound";
import CopyButton from "./CopyButton";
import colors from "../utils/colors";

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
        console.log(data.user);
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
        <div
          id="user-content"
          style={{
            backgroundImage: colors[userData.background],
          }}
        >
          <Nav
            className="mx-auto w-100 py-2 justify-content-between fixed-top"
            style={{ maxWidth: 772 }}
          >
            <NavItem>
              <NavLink tag={Link} to="/">
                DevTree
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <CopyButton url={window.location.href} />
              </NavLink>
            </NavItem>
          </Nav>

          <Container
            id="user-content-main"
            className="mx-auto pt-4 text-center"
            style={{
              maxWidth: 992,
            }}
          >
            <h1 className="h1 pb-2">{userData.username}</h1>
            {userData.bio && <p>userData.bio</p>}
            {userData.links.length !== 0 ? (
              <p>Links</p>
            ) : (
              <p className="fst-italic mb-5">No links created yet...</p>
            )}
          </Container>
        </div>
      )}
    </>
  );
}

export default User;
