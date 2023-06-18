import React from 'react';
import { BASE_URL } from '../../api';
import { useEffect,useState } from 'react';


const GetActivities = () => {

    const [activities,setActivities] = useState([]);


    const myData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/activities`, {
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
        async function getActivities() {
          const results = await myData();
          setActivities(results);
          console.log("activities:" , results);
        }
        getActivities();
      }, [ ]);
  

return (
    <>
  <div>
    <div>
      {activities.length ? (
        activities.map(({ id, name, description }, idx) => (
          <div key={id ?? idx}>
            <h1>{name}</h1>
            <h3>{description}</h3>
            <h4>Id:{id}</h4>
          </div>
        ))
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  </div>
  
    </>
  )
}

export default GetActivities;