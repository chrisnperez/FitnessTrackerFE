import React, { useState } from "react";
import { BASE_URL } from "../../api";
import Modal from "react-modal";

const GetRoutineActivities = ({ routines }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const myData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines/`, {
        headers: {
          "Content-Type": "application/json",
        },
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
      <button onClick={openModal}>See Activities</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Routine Activities Popup"
      >
        <div>
          <button onClick={closeModal}>Close Activities</button>
          <div>
            {routines.length ? (
              routines.map(({ id, activities }) => (
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
          <button onClick={closeModal}>Close Activities</button>
        </div>
      </Modal>
    </>
  );
};

export default GetRoutineActivities;
