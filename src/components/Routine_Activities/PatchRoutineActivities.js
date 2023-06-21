import React from "react";

import { useState } from "react";
import { BASE_URL } from "../../api";

const PatchRoutineActivities = ({id, token}) => {

    const [count,setCount] = useState("");
    const [duration,setDuration] = useState("");
    const [display,setDisplay] = useState("none");

    const myData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`
            },
            body: JSON.stringify({
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

        <button onClick={PatchRoutineActivities}>Submit</button>
        </div>  

         <button
                className="editButton"
                onClick={() => {
                    display === "none" ? setDisplay("block") : setDisplay("none");
                }}>
                {display === "none" ? "Edit Routine Activities" : "Cancel"}
            </button>
        
        </>
      )


}

export default PatchRoutineActivities;