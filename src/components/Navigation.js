import React from 'react'
import {Navbar,Nav,Button,NavDropdown,Form,FormControl} from 'react-bootstrap'
const Navigation = (props) => {
    return(
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Trip Planner</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Login</Nav.Link>
      <NavDropdown title="Menu" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">View Your plans</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Edit Your plans</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
    )
};
export default Navigation