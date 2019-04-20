import React from 'react'

import {Form, Button, Jumbotron, Card} from 'react-bootstrap'
import Navigation from '../components/Navigation'
import styles from './loginForm.css' 

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import loginForm from './loginForm';
const registerForm = (props) => {
    return(

        <div>
        <Navigation /> 
            <div className={styles.Card}> 
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card  style={{ width: '30rem' }}> 
            <Card.Header>가입하기</Card.Header>
           <Card.Img variant="top" src="http://storage.googleapis.com/dev-truth-229618.appspot.com/images/register.jpg" />
  
            <Card.Body>
                <Form>
                <Form.Group controlId="formBasicEmail">
              <Form.Label>이름</Form.Label>
             <Form.Control type="email" placeholder="Enter email" />
            
            </Form.Group>
      
             <Form.Group controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
             <Form.Control type="email" placeholder="Enter email" />
            
            </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="저장하기" />
        </Form.Group>
        <Button variant="primary" type="submit">
          가입하기
        </Button>
      </Form>
      <Card.Link href="/login">이미 계정이 있다면 로그인을 하십시오.</Card.Link>
      
      </Card.Body>
     
      </Card>
      </div>
      </div>
      <Route path="/login/" component={registerForm} />
        
      </div>
    );
};
export default registerForm