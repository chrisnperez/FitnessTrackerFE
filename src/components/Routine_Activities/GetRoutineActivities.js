import React from "react";
import { BASE_URL } from "../../api";
import { useState } from "react";


const GetRoutineActivities = ({ routines }) => {

    const [display, setDisplay] = useState("none");

    const myData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/routines/`, {
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

    return (
        <>
            <div style={{ display: display }}>
                <div>
                    {routines.length ? (
                        routines.map(({ id, creatorId, creatorName, goal, isPublic, name, activities }) => (
                            <div key={id}>
                                {activities.map((activity) => (
                                    <div key={activity.id}>
                                        <h3>Activity ID: {activity.id}</h3>
                                        <h4>Name: {activity.name}</h4>
                                        <h4>Description: {activity.description}</h4>
                                        <h4>Duration: {activity.duration} minutes</h4>
                                        <h4>Count: {activity.count} sets</h4>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No Activities found.</p>
                    )}
                </div>
            </div>
            <button
                className="seeActivitiesButton"
                onClick={() => {
                    display === "none" ? setDisplay("block") : setDisplay("none");
                }}>
                {display === "none" ? "See Activities " : "Hide"}
            </button>

        </>
    );

}

export default GetRoutineActivities;