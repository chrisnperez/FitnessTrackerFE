import React from 'react';
import { BASE_URL } from '../../api';
import { useEffect, useState } from 'react';
import UpdateActivities from './UpdateActivities';
import GetActivityWithPublicRoutine from './GetActivityWithPublicRoutine';


const GetActivities = ({ token, getActivities, activities, setActivities }) => {

  // const [activities,setActivities] = useState([]); moved this to the app level to try to destructure the avitivity id.

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
    }
    getActivities();
  }, []);


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
                <UpdateActivities name={name} description={description} token={token} id={id} />
                <GetActivityWithPublicRoutine id={id} />
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