import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container } from "reactstrap";

function User() {
  const navigate = useNavigate();

  const { user } = useParams();

  // todo call server
  // if user not found redirect to 400
  // else display user data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/${user}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setUserData(data);
      } else if (response.status === 404) {
        navigate("/404");
      }
    }
    fetchUserData();
  }, [user, navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="mx-auto text-center" style={{ maxWidth: 992 }}>
        <h1 className="display-1">{userData}</h1>
      </Container>
    </>
  );
}

export default User;
