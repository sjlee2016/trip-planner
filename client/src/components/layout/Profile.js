import React from 'react'
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux'; 
import PropTypes from 'prop-types';
import {loadUser} from '../../actions/auth';
import { Container, Row, Col} from 'reactstrap';
import {Image} from 'react-bootstrap'; 
const Profile = ({isAuthenticated,state}) => {
    console.log(isAuthenticated);
    console.log(state);
    if(isAuthenticated && state.user != null) {
        return (
        
    <Container>
        <Row sm> 
        <Col xs={3} md={2}>
        <Image src= {state.user.avatar}  rounded />
        </Col>     
      </Row>
      <Row sm>
      {state.user.name}
      </Row>
       <Row sm>
       {state.user.email}
      </Row>
  </Container>
        )
    
    } else{
        return(
        <div>
            you are not logged in
        </div>
        );
    }
}


Profile.propTypes = {
  isAuthenticated : PropTypes.bool,
  user : PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
}; 

function mapStateToProps (state) {
  return {
  isAuthenticated : state.auth.isAuthenticated,
  state : state.auth
  }
} 
export default connect(mapStateToProps, {loadUser})(Profile)
