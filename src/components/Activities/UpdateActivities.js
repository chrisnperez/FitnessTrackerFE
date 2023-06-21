import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../api';

const UpdateActivities = ({ token, name, id, description, user }) => {
    const [display, setDisplay] = useState("none");
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const updateActivity = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/activities/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editName,
                    description: editDescription
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
                    <label htmlFor="name">Name: </label>
                    <input
                        required
                        label="Name"
                        value={editName}
                        onChange={event => setEditName(event.target.value)}
                    />
                </div>
                <label htmlFor="description">Description: </label>
                <input
                    required
                    label="Description"
                    value={editDescription}
                    onChange={event => setEditDescription(event.target.value)}
                />

                <button onClick={updateActivity}>Submit</button>
            </div>
            <button
                className="editButton"
                onClick={() => {
                    display === "none" ? setDisplay("block") : setDisplay("none");
                }}>
                {display === "none" ? "Edit" : "Cancel"}
            </button>
        </>
    )
}

export default UpdateActivities;
