import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect,useCallback } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../api';


const UserRoutines = ({ token, user }) => {

  const [routines,setRoutines] = useState([]);

  const myData = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${user}/routines`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw err; // Propagate the error
    }
  }, [user, token]);
  
  
      useEffect(() => {
        async function getUserRoutines() {
          const results = await myData();
          setRoutines(results);
          console.log("routines:" , results);
        }
        getUserRoutines();
      }, [user, myData]);

      


return (
  <>
  <h2>Hello {user}! </h2>
<div>
  Here are your routines:
  <div>
    {routines.length ? (
      routines.map(({ id, creatorId, name, goal }, idx) => (
        <div key={id ?? idx}>
          <h1>{name}</h1>
          <h3>{goal}</h3>
          <h4>CreatorId:{creatorId} Id:{id}</h4>
        </div>
      ))
    ) : (
      <p>No routines found.</p>
    )}
  </div>
</div>

  </>
)

}


export default UserRoutines;