import React from 'react';
import { BASE_URL } from '../../api';
import { useState } from "react";


const AddActivityToRoutines = ({ id, token, activities }) => {
  const [activityId, setActivityId] = useState(0);
  // ^^^ this needs to be set to the activity id maybe by desctructuring the activity in the App level
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [display, setDisplay] = useState("none");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");


  const AddingActivity = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/routines/${id}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({

          activityId: activityId,
          count: count,
          duration: duration
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <div style={{ display: display }}>
      <fieldset>
        <label htmlFor="selet-activityId">
          Activity <span className="activity-dropdown">({activities.length})</span>
        </label>
        <select
          name="activity"
          id= "select-activityId"
          value={activityId}
          onChange={(event) => setActivityId(event.target.value)}
        >
          <option value="any">Any</option>
          {activities.sort((a,b) => a.name.localeCompare(b.name))
          .map((activity) => {
          return <option key={activity.id} value={activity.id}>
             {activity.name}
            </option>
          })}
        </select>
      </fieldset>
       
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            required
            min="0"
            max="100"
            label="duration"
            value={duration}
            onChange={event => setDuration(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="count">Count:</label>
          <input
            type="number"
            required
            min="0"
            max="100"
            label="count"
            value={count}
            onChange={event => setCount(event.target.value)}
          />
        </div>

        <button onClick={AddingActivity}>Submit</button>
      </div>
      <button
        className="AddActivityButton"
        onClick={() => {
          display === "none" ? setDisplay("block") : setDisplay("none");
        }}>
        {display === "none" ? "AddActivity" : "Cancel"}
      </button>
    </>
  );
}

export default AddActivityToRoutines;