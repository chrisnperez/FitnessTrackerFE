import React from 'react';
import { BASE_URL } from '../../api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const DeleteRoutineActivities = ({ token, user, creatorName, routineActivityId }) => {
    const history = useHistory();
    const myData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();
            alert('Routine Activity Deleted');
            history.push('/routines');

            
            
            return result
        } catch (err) {
            console.error(err);
        }
    }

    

    if (user !== creatorName) {
        return null;
    }

    return (
        <>
            <div>
                <button onClick={myData}>Delete Routine Activity</button>
            </div>

        </>
    );



}

export default DeleteRoutineActivities;