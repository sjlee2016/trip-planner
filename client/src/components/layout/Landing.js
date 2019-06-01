import React from 'react'
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux'; 
import PropTypes from 'prop-types';
const Landing = ({isAuthenticated,state}) => {
  
    if(isAuthenticated) {
      var userName = null;
      if(state.user!=null)
        userName = state.user.name; 

      return(
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Trip-Planner</h1>
          <p className="lead">
            Welcome Back {userName} 
          </p>
        </div>
      </div>
    </section>
    ) 
    } 
    return(
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Trip-Planner</h1>
          <p className="lead">making plans can be enjoyable with trip-planner
          </p>
          <div className="buttons">
            <Link to='/register' className="btn btn-primary">Sign Up </Link> 
            <Link to='/login' className="btn btn-light">Login </Link> 
          </div>
        </div>
      </div>
    </section>
    )
};

Landing.propTypes = {
  isAuthenticated : PropTypes.bool,
  user : PropTypes.object.isRequired
}; 

function mapStateToProps (state) {
  return {
  isAuthenticated : state.auth.isAuthenticated,
  state : state.auth
  }
} 

export default connect(mapStateToProps)(Landing)
