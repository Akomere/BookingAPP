import React from "react"
import {Navbar, Nav, Container} from "react-bootstrap"

function Navigate(){
    return(
<Navbar variant="dark" className="color-nav" >
  <Container>
    <Navbar.Brand className="nav-text-title" href="#home">Therapie Clinic</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="nav-text-center">
        <Nav.Link  href="#home">Therapy Clinic Availability Search</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default Navigate
