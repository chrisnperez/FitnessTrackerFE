import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../../api';


const UserRoutines = ({ token, user }) => {

  const [routines, setRoutines] = useState([]);

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
      throw err;
    }
  }, [user, token]);


  useEffect(() => {
    async function getUserRoutines() {
      const results = await myData();
      setRoutines(results);
      console.log("routines:", results);
    }
    getUserRoutines();
  }, [user, myData]);


  if (!token) {
    return (
      <>
        <h3>Please log in first to see profile!</h3>
      </>
    );
  }

  return (
    <>
      <h2>Welcome {user}! </h2>
      <div>
        Here are your routines:
        <div >
          {routines.length ? (
            routines.map(({ id, creatorId, name, goal }, idx) => (
              <div className="profile-countainers" key={id ?? idx}>
                <h2>{name}</h2>
                <p>{goal}</p>
                {/* <h4>CreatorId:{creatorId} Id:{id}</h4> */}
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