import React from 'react';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../api';
import Modal from "react-modal";

Modal.setAppElement("#app");


const GetActivityWithPublicRoutine = (props) => {
  const { id } = props;
  const [activity, setActivity] = useState([]);
  const [isModalOpen,setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities/${id}/routines`, {
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

  useEffect(() => {
    async function getActivity() {
      const results = await handleSubmit();
      setActivity(results);
      console.log("activity:", results);
    }
    getActivity();
  }, []);

  return (
    <>
      <div className="getActivityWithPublicRoutine">
      <button onClick={openModal}>See Routines</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Routine Activities Popup"
      >
        <div>
          <button onClick={closeModal}>Close</button>
          {activity.length ? (
            activity.map(({ id, name, goal, creatorName, activities }, idx) => (
              <div key={id ?? idx}>
                <h1>{name}</h1>
                <h3>{goal}</h3>
                <h4>Id: {creatorName}</h4>
  
                {activities.length ? (
                  activities.map((activity) => (
                    <div key={activity.id}>
                      <h3>activityId: {activity.id}</h3>
                      <h4>Name: {activity.name}</h4>
                      <h4>Description:{activity.description} </h4>
                      <h4>duration: {activity.duration} minutes</h4>
                      <h4>count: {activity.count} sets</h4>
                    </div>
                  ))
                ) : (
                  <p>No activities found.</p>
                )}
              </div>
            ))
          ) : (
            <p>No routines with that activity found.</p>
          )}
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
      </div>
    </>
  );
  
}


export default GetActivityWithPublicRoutine;
