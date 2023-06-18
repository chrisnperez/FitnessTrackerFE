import React from 'react';
import { Route, Link } from 'react-router-dom';
import {useState} from 'react';

import {
  Register,
  UserRoutines,
  Profile,
  Logout
} from './components';

const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ?? null);
  const [ user, setUser ] = useState(null); 
  const [routines,setRoutines] = useState([]);
    return (
    <>
    <nav className='navBar'>
                <Link to="/">Home</Link> |
                <Link to="/routines">Routines</Link> |
                <Link to="/profile">Profile</Link> |
                <Link to="/users/login">Account</Link> 

            </nav>

    <Route path = "/users/:actionType">
        <Register token = {token} setToken = {setToken} user = {user} setUser = {setUser} />
    </Route>

    <Route exact path = "/routines"> 

    </Route>

    <Route exact path = "/profile">
      <Profile token = {token} setToken = {setToken} setUser = {setUser} /> 
      <hr></hr>
      <Logout token = {token} setToken = {setToken} setUser = {setUser} />   
       <UserRoutines token = {token} user = {user} />
    </Route>

    
    </> 
    )
  }

  export default App; 