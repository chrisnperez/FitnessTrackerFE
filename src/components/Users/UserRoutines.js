import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../../api';

import UpdateRoutines from '../Routines/UpdateRoutines';
import DeleteRoutines from '../Routines/DeleteRoutines';
import AddActivityToRoutines from '../Routines/AddActivityToRoutines';
import GetRoutineActivities from '../Routine_Activities/GetRoutineActivities';


const UserRoutines = ({ token, user, activitiesTop }) => {

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
            routines.map(({ id, creatorId, name, goal, creatorName, activities }, idx) => (
              <div className="profile-countainers" key={id ?? idx}>
                <h2>{name}</h2>
                <p>{goal}</p>
                <GetRoutineActivities activities={activities}
                    id={id}
                    creatorName={creatorName}
                    user={user}
                    token = {token}
                     />
                <div>
                  <AddActivityToRoutines
                    id={id}
                    token={token}
                    activities={activitiesTop}
                    creatorName={creatorName}
                    user={user}
                  />
                </div>
                <UpdateRoutines
                  token={token}
                  id={id}
                  creatorId={creatorId}
                  creatorName={creatorName}
                  user={user}
                />
                <DeleteRoutines
                  token={token}
                  id={id}
                  creatorName={creatorName}
                  user={user}
                />
              
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