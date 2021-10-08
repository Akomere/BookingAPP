import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Container } from "reactstrap"

function Navigate() {
  return (
    <Navbar variant="dark" className="color-nav" expand="lg" >
      <Container>
        <Navbar.Brand className="nav-text-title" href="/">Therapie Clinic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-text-center">
            <Nav.Link href="/">Check Available Time Slots</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigate
