import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {login, loadUser} from '../../actions/auth'; 
import {connect} from 'react-redux'; 
import PropTypes from 'prop-types'; 
import image from '../../img/pexels-photo-346885.jpeg'; 
import {Card, ListGroup, ListGroupItem,Button} from 'react-bootstrap'; 
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const Login = ({setAlert, login, isAuthenticated, loadUser }) => {
  

const styles = {
  cover : {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 10
  },
  button: {
    width: 10
  },
  card : {
    width: '30rem',  
    justifyContent: 'center',
    alignItems: 'center', 
    marginLeft: "auto",
    marginRight: "auto"

  }
}; 

  const [ formData, setFormData ] = useState({
    email : '',
    password : ''
  }); 
  const { email, password }  = formData;

  const onChange = async (e) => {
    setFormData({...formData, [e.target.name] : e.target.value}); 
  }
  
  // redirect if authenticated
  if(isAuthenticated){
    return <Redirect to="/" />
  }
  const onSubmit = async e => {
    console.log("submitted");
    e.preventDefault();
    if(email==null ||  password == null ){
      setAlert('Email or password is missing', 'danger'); 
    }else{
      login({email,password}); 
      loadUser();
      return <Redirect to="/"/> 
    }
  }
    return (
      <div styles={{display: 'flex', justifyContent: 'center'}}> 
      <Card style={styles.card} >
  <Card.Img variant="top" src={image} style={styles.cover} />
  <p className="h5 text-center mb-4">Login</p>
            <div className="grey-text">
      <MDBInput
              
              type="text"
              icon="envelope"
              group
              error="wrong"
              success="right"
              label="email"
              placeholder="Email"
              name="email"
              onChange={e => {onChange(e)}}
              required
        />

         <MDBInput
              
              type="password"
              icon="lock"
              group
              error="wrong"
              success="right"
              label="password"
              placeholder="password"
              name="password"
              onChange={e => {onChange(e)}}
              required
        />
    
        </div>
        
    

  <br/>
    <Button type="submit" size="sm" variant="success" styles={styles.button} onClick={e=>onSubmit(e)}> Submit </Button> 
   
  <Card.Body>
    <Card.Text>
    Already Have an account?
    </Card.Text>
    <Card.Link href="/login">Login</Card.Link>
  </Card.Body>
</Card>
</div>
    );
};

Login.propTypes = {
  setAlert : PropTypes.func.isRequired,
  login : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool.isRequired,
  loadUser : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
}); 
export default connect(mapStateToProps, {setAlert, login, loadUser}) (Login);