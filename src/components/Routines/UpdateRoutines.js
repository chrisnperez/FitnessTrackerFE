import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../api';

const UpdateRoutines = (props) => {
    const {
        token,
        id,
        isPublic
    } = props;

    const [display, setDisplay] = useState("none");
    const [editName, setEditName] = useState("");
    const [editGoal, seteditGoal] = useState("");
    const [editIsPublic, setEditIsPublic] = useState(isPublic);

    const toggleChecked = () => setEditIsPublic(value => !value);

    // console.log(editIsPublic)

    const updateRoutine = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/routines/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                },
                body: JSON.stringify({
                    name: editName,
                    goal: editGoal,
                    isPublic: editIsPublic
                })
            });

            const result = await response.json();
            console.log("token:", token);
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
                <label htmlFor="goal">Goal: </label>
                <input
                    required
                    label="Goal"
                    value={editGoal}
                    onChange={event => seteditGoal(event.target.value)}
                />
                <label htmlFor="checkbox">Public</ label>
                <input
                    type="checkbox"
                    value="check"
                    onChange={toggleChecked}
                ></input>

                <button onClick={updateRoutine}>Submit</button>
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

export default UpdateRoutines;