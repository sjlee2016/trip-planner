import React, {Component} from 'react'
import {Form, Button, Jumbotron, Card} from 'react-bootstrap'
import Navigation from '../components/Navigation'
import styles from './loginForm.css' 

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import registerForm  from './registerForm';
class loginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password:""
    }
  }
  handlePasswordChange = event => {
    this.setState({
    password: event.target.value
    });
  }

  handleEmailChange = event => {
    this.setState({
    email: event.target.value
    });
  }
  
  handleConfirmationSubmit = async event => {
    var data = {
      "username": this.state.username,
      "password": this.state.password
   }
   
   fetch("/signup", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(data)
   })
   .then(function(response){ 
    return response.json();   
   })
   .then(function(data){ 
   console.log(data)
   });
  }

  render(){


    return(

        <div>
        <Navigation /> 
            <div className={styles.Card}> 
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card  style={{ width: '30rem' }}> 
            <Card.Header>로그인 페이지</Card.Header>
           <Card.Img variant="top" src="http://storage.googleapis.com/dev-truth-229618.appspot.com/images/login.jpg" />
  
            <Card.Body>
                <Form>
             <Form.Group controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
             <Form.Control type="email" placeholder="Enter email" />
             <Form.Text className="text-muted">
              이메일은 다른 곳에 사용되지 않습니다.
            </Form.Text>
         </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="저장하기" />
        </Form.Group>
        
    
        <Button variant="primary" type="submit" onClick={this.handleConfirmationSubmit}>
          로그인
        </Button>
      </Form>
      <Card.Link href="/register">계정이 없다면 회원가입을 하십시오.</Card.Link>
      
      </Card.Body>
      </Card>
      </div>
      </div>
      <Route path="/register/" component={registerForm} />
        
      </div>
      
    );
  }
};
export default loginForm