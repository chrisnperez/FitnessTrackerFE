import React from 'react';
import { BASE_URL } from '../../api';
import {useState } from "react";


const CreateRoutineActivities = ({id}) => {
    const [activityId,setActivityId] = useState("");
    const [count,setCount] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${BASE_URL}/routines/${id}/activities`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
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
    <h3>Create an Routine below!</h3>
    
    <div className="postin">
            
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text"
               className="loginuser"
               placeholder="Title Here"
               value = {activityId}
               onChange = {(event) => setActivityId(event.target.value)}
        ></input>
        <label htmlFor="goal">Goal</label>
        <input type ="text"
               className="loginuser"
               placeholder="Goal here"
               value = {goal}
               onChange = {(event) => setGoal(event.target.value)}
        ></input>
        <label htmlFor = "checkbox">Public</ label>
        <input 
           type="checkbox"
           value="check"
           onChange={toggleChecked}
        ></input>  
        <button type="submit">Submit</button>
        </form>
    </div>
    </>
      );
}

export default CreateRoutineActivities;