import React from 'react';
import { BASE_URL } from '../../api';


const DeleteRoutineActivities = ({id, token}) => {

    const myData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
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
            <div>
            <button onClick={DeleteRoutineActivities}>Delete Routine Activity</button>
            </div>

        </>
    );



}

export default DeleteRoutineActivities;