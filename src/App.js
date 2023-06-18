import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import {useState} from 'react';
import {
  Register,
  UserRoutines,
  Profile,
  Logout,
  GetActivities
} from './components';
import { BASE_URL } from './api';
import { CreateActivity } from './components';


const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ?? null);
  const [ user, setUser ] = useState(null); 
  const [routines,setRoutines] = useState([]);

  useEffect(() => {
    const tempToken = localStorage.getItem('token');
    if (tempToken) {
      setToken(tempToken);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` })
            },
          });
          const result = await response.json();
          const confirmedUser = result?.username
          // setPassword('');
          // setUsername('');
          setUser(confirmedUser)
    
        } catch (err) {
          console.error(err);
        }
      }
    }
    fetchUser();
    }, [token]);

   

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
     <CreateActivity token = {token} />
     <hr></hr>
    <GetActivities />
    </Route>

    <Route exact path = "/profile">
      <Profile token = {token} setToken = {setToken} setUser = {setUser} user={user} /> 
      <hr></hr>
      <Logout token = {token} setToken = {setToken} setUser = {setUser} />   
       <UserRoutines token = {token} user = {user} />
    </Route>

    
    </> 
    )
  }

  export default App; 