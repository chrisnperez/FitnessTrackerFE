import React, { useEffect } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../api';

import UpdateRoutines from './UpdateRoutines';
import DeleteRoutines from './DeleteRoutines';
import AddActivityToRoutines from './AddActivityToRoutines';
import PatchRoutineActivities from '../Routine_Activities/PatchRoutineActivities';
import DeleteRoutineActivities from '../Routine_Activities/DeleteRoutineActivities';
import GetRoutineActivities from '../Routine_Activities/GetRoutineActivities';

const GetRoutines = ({ token, activities }) => {
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
              { id, creatorId, creatorName, goal, isPublic, name },
              idx
            ) => (
              <div className="routine-container" key={id ?? idx}>
                <div>
                  <h2>{name}</h2>
                  <h3>{goal}</h3>
                  {/* <h4>Id: {id}</h4> */}
                  {/* <h4>Public: {isPublic}</h4> */}
                  {/* <h4>Creator Id: {creatorId}</h4> */}
                  <h4>Creator Name: {creatorName}</h4>
                  <GetRoutineActivities routines={routines} />
                  <div>
                    <AddActivityToRoutines
                      id={id}
                      token={token}
                      activities={activities}
                    />
                  </div>
                  <UpdateRoutines
                    isPublic={isPublic}
                    token={token}
                    id={id}
                  />
                  <DeleteRoutines token={token} id={id} />
                  <PatchRoutineActivities id={id} token={token} />
                  <DeleteRoutineActivities id={id} token={token} />
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
