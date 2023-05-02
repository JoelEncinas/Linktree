import React from "react";
import NotLoggedNavbar from "./NotLoggedNavbar";
import { Container } from "reactstrap";
import useProtectedRoute from "../hooks/useProtectedRoute";

function Home() {
  useProtectedRoute();

  return (
    <>
      <NotLoggedNavbar />
      <Container className="mx-auto text-center" style={{ maxWidth: 992 }}>
        <h1>Home</h1>
        <p>Welcome to home page.</p>
      </Container>
    </>
  );
}

export default Home;
