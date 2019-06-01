import React, { Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Navibar from './components/layout/Navibar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert'; 
import Profile from './components/layout/Profile'; 

import './App.css';

// Redux
import { Provider } from 'react-redux'; 
import store from './store'; 
import {loadUser} from './actions/auth'; 
import setAuthToken from './utils/setAuthToken'; 
if (localStorage.token) {
  console.log("auth token is set in Appjs");
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() => {
      store.dispatch(loadUser()); 
    },[]); 

    // [] is the same as componentDidAmount 

  return (
 <Provider store={store}>
 <Router>
 <Fragment>
   <Navibar/>
   <Route exact path = "/" component = { Landing } /> 
   <section className="container">
   <Alert />
   <Switch>
     <Route exact path = "/register" component = {Register} /> 
       <Route exact path = "/login" component = {Login} /> 
       <Route exact path = "/profile" component = {Profile} />
     </Switch>
   </section>
  </Fragment> 
  </Router>
  </Provider> 
);
}
export default App;
