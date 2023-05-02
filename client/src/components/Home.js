import React from "react";
import NotLoggedNavbar from "./NotLoggedNavbar";
import { Container } from "reactstrap";
import useRedirectToProtectedRoute from "../hooks/useRedirectToProtectedRoute";

function Home() {
  useRedirectToProtectedRoute();

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
