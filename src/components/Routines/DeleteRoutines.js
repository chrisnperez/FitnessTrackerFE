import React from "react";
import { BASE_URL } from '../../api';

const DeleteRoutines = ({ token, id, user, creatorName }) => {

    const DeleteRoutine = async () => {
        try {
            const response = await fetch(`${BASE_URL}/routines/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();
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
                <button onClick={DeleteRoutine}>Delete Routine</button>
            </div>
        </>
    );

}

export default DeleteRoutines;