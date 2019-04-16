import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import loginForm  from './Pages/loginForm'; 
import registerForm  from './Pages/registerForm';
import CalendarPage from './Pages/CalendarPage';
import Home from './Pages/Home';
class App extends Component {
  render() {
    return (
      <div> 
      <Router>
        <Route path="/login/" component={loginForm} />
        <Route path="/register/" component={registerForm} />
        <Route path="/scheduler/" component={CalendarPage} />
        <Route exact path="/" component={Home} /> 
     
    </Router>
    </div> 
    );
  }
}

export default App;
