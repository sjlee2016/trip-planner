import React from 'react'
import styles from './Home.css'
import {Form, Button, Jumbotron, Card, Container, Row, Col } from 'react-bootstrap'
import Navigation from '../components/Navigation'
const Home = (props) => {
    return ( 
    <div className={styles.Home}>
    <Navigation /> 
    <div className={styles.page} > 
    <Jumbotron>
  <h1>Hello, world!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>;
</div>
     </div> 
     
    
);
};
export default Home