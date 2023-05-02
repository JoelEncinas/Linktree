import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function NotLoggedNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      color="primary"
      dark={true}
      expand="md"
      container="sm"
      className="mb-4"
    >
      <NavbarBrand tag={Link} to="/">
        DevTree
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar className="justify-content-end">
        <Nav navbar>
          <NavItem className="mx-1 my-1" style={{ width: 100 }}>
            <NavLink tag={Link} to="/auth/login" className="btn btn-secondary">
              Login
            </NavLink>
          </NavItem>
          <NavItem className="mx-1 my-1" style={{ width: 100 }}>
            <NavLink
              tag={Link}
              to="/auth/register"
              className="btn btn-secondary"
            >
              Register
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NotLoggedNavbar;
