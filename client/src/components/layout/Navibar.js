import React , {useEffect} from 'react';
import {Link} from 'react-router-dom'; 
import {logOut} from '../../actions/auth'; 
import {Button,Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'; 
import {connect } from 'react-redux'; 
import PropTypes from 'prop-types';
const Navibar = ({isAuthenticated, logOut}) => {

   

    const onClick = async e => {
        logOut();
    };

    if(isAuthenticated){

        return (

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
  <Navbar.Brand href="/">Trip-Planner</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/manage">Manage Group</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link onClick={onClick}>Logout</Nav.Link>

    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

    
        )
    }
    return (
      
        <Navbar  bg="dark" variant="dark"  expand="lg" fixed="top">
        <Navbar.Brand href="/">Trip-Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>

          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
};

Navibar.propTypes = {
    isAuthenticated : PropTypes.bool,
    logOut : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logOut})(Navibar);
