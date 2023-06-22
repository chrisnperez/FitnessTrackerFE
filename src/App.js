import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useState } from 'react';
import {
  Register,
  UserRoutines,
  GetActivities,
  CreateActivities,
  GetRoutines,
  CreateRoutines,
  DropDownNavbar,
  HomePage
} from './components';
import { BASE_URL } from './api';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ?? null);
  const [user, setUser] = useState(null);
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
          setUser(confirmedUser)

        } catch (err) {
          console.error(err);
        }
      }
    }
    fetchUser();
  }, [token, user]);


  const ActivityGetter = async () => {
    const response = await fetch(`${BASE_URL}/activities`, ({
      headers: {
        'Content-Type': 'application/json',
      },
    }))
    const result = await response.json();
    return result;
  }

  useEffect(() => {
    async function fetchActivities() {
      const results = await ActivityGetter();
      setActivities(results);
    }
    fetchActivities();
  }, [token])


  return (
    <>
      <DropDownNavbar
        setToken={setToken}
        setUser={setUser}
        token={token} />
      <Route exact path="/" >
        <hr></hr>
        <HomePage token={token} />
      </Route>

      <Route path="/users/:actionType">
        <Register
          token={token}
          setToken={setToken}
          user={user}
          setUser={setUser}
        />
      </Route>

      <Route exact path="/activities">
        <CreateActivities
          token={token}
          ActivityGetter={ActivityGetter}
        />
        <hr></hr>
        <GetActivities
          token={token}
          setActivities={setActivities}
          activities={activities}
          ActivityGetter={ActivityGetter}
          user={user}
        />
      </Route>

      <Route exact path="/routines">
        <CreateRoutines token={token} />
        <hr></hr>
        <GetRoutines
          token={token}
          activitiesTop={activities}
          user={user}
          setActivities={setActivities}
        />
      </Route>

      <Route exact path="/profile">
        <hr></hr>
        <UserRoutines
          token={token}
          user={user}
          activitiesTop={activities}
        />
      </Route>
    </>
  )
}

export default App; 