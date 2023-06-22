import React from 'react';
import UpdateActivities from './UpdateActivities';
import GetActivityWithPublicRoutine from './GetActivityWithPublicRoutine';


const GetActivities = ({ token, activities }) => {

  return (
    <>
      <div>
        <div>
          {activities.length ? (
            activities.map(({ id, name, description }, idx) => (
              <div className='activity-countainer' key={id ?? idx}>
                <h2>{name}</h2>
                <p>{description}</p>
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