import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Register,
  UserRoutines,
  Profile,
  Logout,
  GetActivities,
  CreateActivities,
  UpdateActivities,
  GetActivityWithPublicRoutine,
  GetRoutines,
  CreateRoutines
} from './components';
import { BASE_URL } from './api';
// import {AddActivityToRoutines} from './components/Routines/AddActivityToRoutines';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ?? null);
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
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

  useEffect(() => {
    async function fetchActivities(){
      const results = await ActivityGetter();
      setActivities(results);
    }
    fetchActivities();
  }, [])

  const ActivityGetter = async () => {
    const response = await fetch(`${BASE_URL}/activities`, ({
      headers: {
        'Content-Type': 'application/json',
      },
    }))
    const result = await response.json();
    console.log(result);
    return result;
  }


  return (
    <>
      <nav className='navBar'>
        <Link to="/">Home</Link> |
        <Link to="/activities">Activities</Link> |
        <Link to="/routines">Routines</Link> |
        <Link to="/profile">Profile</Link> |
        <Link to="/users/login">Account</Link>

      </nav>

      <Route exact path="/" >
        {/* <AddActivityToRoutines /> */}
      </Route>

      <Route path="/users/:actionType">
        <Register token={token} setToken={setToken} user={user} setUser={setUser} />
      </Route>

      <Route exact path="/activities">
        <CreateActivities token={token} ActivityGetter = {ActivityGetter} />
        <hr></hr>
        <GetActivities token={token} setActivities={setActivities} activities = {activities} ActivityGetter = {ActivityGetter} />
      </Route>

      <Route exact path="/routines">
        <CreateRoutines token={token} />
        <hr></hr>
        <GetRoutines token={token} activities={activities} />
      </Route>

      <Route exact path="/profile">
        <Profile token={token} setToken={setToken} setUser={setUser} user={user} />
        <hr></hr>
        <Logout token={token} setToken={setToken} setUser={setUser} />
        <UserRoutines token={token} user={user} />
      </Route>


    </>
  )
}

export default App; 