import React from "react"
import {Navbar, Nav, Container} from "react-bootstrap"

function Navigate(){
    return(
<Navbar bg="primary" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Zontlabs</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#home">Therapy Clinic Availability Search</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default Navigate
