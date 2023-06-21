import React, { useEffect } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../api';

import UpdateRoutines from './UpdateRoutines';
import DeleteRoutines from './DeleteRoutines';
import AddActivityToRoutines from './AddActivityToRoutines';
import PatchRoutineActivities from '../Routine_Activities/PatchRoutineActivities';
import DeleteRoutineActivities from '../Routine_Activities/DeleteRoutineActivities';
import GetRoutineActivities from '../Routine_Activities/GetRoutineActivities';

const GetRoutines = ({ token, user, activitiesTop }) => {
  const [routines, setRoutines] = useState([]);

  const myData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      // console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function getRoutines() {
      const results = await myData();
      setRoutines(results);
      console.log('routines:', results);
    }
    getRoutines();
  }, []);

  return (
    <>
      <div>
        {routines.length ? (
          routines.map(
            (
              { id, creatorId, creatorName, goal, isPublic, name, activities },
              idx
            ) => (
              <div className="routine-container" key={id ?? idx}>
                <div>
                  <h2>{name}</h2>
                  <h3>{goal}</h3>
                  <h4>Creator Name: {creatorName}</h4>
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
                    isPublic={isPublic}
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
              </div>
            )
          )
        ) : (
          <p>No Routines found.</p>
        )}
      </div>
    </>
  );
};

export default GetRoutines;
