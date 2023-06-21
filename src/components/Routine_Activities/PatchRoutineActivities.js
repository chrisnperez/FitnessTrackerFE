import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../api";
import Modal from "react-modal";

Modal.setAppElement("#app");

const PatchRoutineActivities = ({ token, user, creatorName, routineActivityId }) => {
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const myData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          count: count,
          duration: duration,
        }),
      });
      const result = await response.json();
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
        Edit Routine Activity
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Routine Activities"

      >
        <div className="modal-content">
          <h2>Edit Routine Activities</h2>
          <label htmlFor="duration">Duration: </label>
          <input
            type="number"
            required
            min="0"
            max="100"
            label="duration"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
          <label htmlFor="count">Count: </label>
          <input
            type="number"
            required
            min="0"
            max="100"
            label="count"
            value={count}
            onChange={(event) => setCount(event.target.value)}
          />
          <button onClick={myData}>Submit</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default PatchRoutineActivities;
