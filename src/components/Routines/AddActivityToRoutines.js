import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../api';
import Modal from 'react-modal';

const AddActivityToRoutines = ({ id, token, activities, creatorName, user , setActivities}) => {
  const [activityId, setActivityId] = useState(0);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  Modal.setAppElement("#app");

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // Update the activities state
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AddingActivity = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/routines/${id}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId: activityId,
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

  return (
    <>
      {creatorName === user && (
        <button onClick={openModal}>Add Activity</button>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Activity to Routines"
        style={{
          overlay: {
            backgroundColor: "transparent",
          },
        }}
      >
        <div className="modal-content">
          <h2>Add Activity</h2>
          <fieldset>
            <label htmlFor="select-activityId">
              Activity <span className="activity-dropdown">({activities.length})</span>
            </label>
            <select
              name="activity"
              id="select-activityId"
              value={activityId}
              onChange={(event) => setActivityId(event.target.value)}
            >
              <option value="any">Any</option>
              {activities
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
            </select>
          </fieldset>

          <div>
            <label htmlFor="duration">Duration:</label>
            <input
              type="number"
              required
              min="0"
              max="100"
              label="duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
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
              onChange={(event) => setCount(event.target.value)}
            />
          </div>

          <button onClick={AddingActivity}>Submit</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default AddActivityToRoutines;
