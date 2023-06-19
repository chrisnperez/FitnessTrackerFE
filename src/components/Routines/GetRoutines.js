import React, { useEffect } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../api';

const GetRoutines = () => {

    const [routines, setRoutines] = useState([]);

    const myData = async () => {
        try {
        const response = await fetch(`${BASE_URL}/routines`, {
          headers: {
          'Content-Type': 'application/json',
          },
        });
        
        const result = await response.json();
        console.log(result);
        return result
        } catch (err) {
        console.error(err);
        }
        }
    
        useEffect(() => {
            async function getRoutines() {
              const results = await myData();
              setRoutines(results);
              console.log("routines:" , results);
            }
            getRoutines();
          }, []);

            return (
        <>
      <div>
        <div>
          {routines.length ? (
            routines.map(({ id, creatorId, creatorName, goal, isPublic, name }, idx) => (
              <div key={id ?? idx}>
                <h1>{name}</h1>
                <h3>{goal}</h3>
                <h4>Id:{id}</h4>
                   <h4>Creator Id: {creatorId}</h4>
                   <h4>Creator Name: {creatorName}</h4>
              </div>
            ))
          ) : (
            <p>No Routines found.</p>
          )}
        </div>
      </div>
      
        </>
    
      )

}

export default GetRoutines;



