import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import useRedirectToProtectedRoute from "../hooks/useRedirectToProtectedRoute";

function NotFound() {
    useRedirectToProtectedRoute();

  return (
    <div style={{ height: "100vh"}} className="d-flex align-items-center justify-content-center mx-4">
      <Container className="mx-auto text-center" style={{ maxWidth: 992 }}>
        <h1 className="display-1">404</h1>
        <p className="lead">
          Oops. Couldn't find the user you where looking for...
        </p>
        <p className="pb-5">
          Want this to be your username?{" "}
          <Link to="/auth/register">Create your DevTree now.</Link>
        </p>

        <Link className="mt-5 h3" style={{textDecoration: "none"}} to="/">DevTree</Link>
      </Container>
    </div>
  );
}

export default NotFound;
