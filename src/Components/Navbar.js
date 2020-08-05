import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";

function Navbar123() {
    return(
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand>Crud react</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="1" as={Link} to="/">Ideas</Nav.Link>
            <Nav.Link eventKey="1" as={Link} to="/category">Manage categories</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Navbar123;

