import React from 'react'

import {Form, Button, Jumbotron, Card} from 'react-bootstrap'
import Navigation from '../components/Navigation'
import styles from './loginForm.css' 
const registerForm = (props) => {
    return(

        <div>
        <Navigation /> 
            <div className={styles.Card}> 
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card  style={{ width: '18rem' }}> 
            <Card.Header>Register Page</Card.Header>
           <Card.Img variant="top" src="./images/login.jpg" />
  
            <Card.Body>
                <Form>
             <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
             <Form.Control type="email" placeholder="Enter email" />
             <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
         </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Card.Body>
      </Card>
      </div>
      </div>
      </div>
    );
};
export default registerForm