import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../api';
import Modal from 'react-modal';

// Set the root element of the modal in the DOM
Modal.setAppElement('#app');

const UpdateRoutines = (props) => {
    const {
        token,
        id,
        isPublic,
        creatorName,
        user
    } = props;

    

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editName, setEditName] = useState("");
    const [editGoal, setEditGoal] = useState("");
    const [editIsPublic, setEditIsPublic] = useState(isPublic);

    const toggleChecked = () => setEditIsPublic(value => !value);

    const updateRoutine = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/routines/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
            return result;
        } catch (err) {
            console.error(err);
        }
    };

    if (user !== creatorName) {
        return null;
    }

    return (
        <>
            <button
                className="editButton"
                onClick={() => setModalIsOpen(true)}
            >
                Edit Routines
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Edit Routine"
                style={{
                    overlay: {
                        backgroundColor: "transparent",
                    },
                }}

            >
                <div className="modal-content">
                    <h2>Edit Routine</h2>
                    <label htmlFor="name">Name: </label>
                    <input
                        required
                        label="Name"
                        value={editName}
                        onChange={event => setEditName(event.target.value)}
                    />
                    <label htmlFor="goal">Goal: </label>
                    <input
                        required
                        label="Goal"
                        value={editGoal}
                        onChange={event => setEditGoal(event.target.value)}
                    />
                    <label htmlFor="checkbox">Public: </label>
                    <input
                        type="checkbox"
                        value="check"
                        checked={editIsPublic}
                        onChange={toggleChecked}
                    />
                    <button onClick={updateRoutine}>Submit</button>
                    <button onClick={() => setModalIsOpen(false)}>Cancel</button>
                </div>
            </Modal>
        </>
    );
};

export default UpdateRoutines;
