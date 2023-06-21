import React from 'react';
import { BASE_URL } from '../../api';
import { useEffect, useState } from 'react';
import UpdateActivities from './UpdateActivities';
import GetActivityWithPublicRoutine from './GetActivityWithPublicRoutine';


const GetActivities = ({ token, ActivityGetter, activities, setActivities }) => {

  // const [activities,setActivities] = useState([]); moved this to the app level to try to destructure the avitivity id.




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