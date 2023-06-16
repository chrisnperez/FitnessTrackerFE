import React from 'react';
import { Route, Link } from 'react-router-dom';
import {useState} from 'react';

import {
  Register
} from './components';

const App = () => {

  const [token,setToken] = useState(null);
  const [ user, setUser ] = useState(null); 

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

    </Route>

    
    </> 
    )
  }

  export default App; 