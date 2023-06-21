import React, { useState } from "react";
import { BASE_URL } from "../../api";
import Modal from "react-modal";
import PatchRoutineActivities from "./PatchRoutineActivities";
import DeleteRoutineActivities from "./DeleteRoutineActivities";

const GetRoutineActivities = ({ activities,id, token, creatorName, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityData, setActivityData] = useState([]);

  const openModal = async () => {
    setIsModalOpen(true);
    console.log("activities:", activities);
  
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            {activities.length ? (
              activities.map((activity) => (
                <div key={activity.id}>
                  <h2>{activity.name}</h2>
                  <p>Description: {activity.description}</p>
                  <p>Duration: {activity.duration} minutes</p>
                  <p>Count: {activity.count} sets</p>
                  <p>activityId : {activity.routineActivityId}</p>
                  <PatchRoutineActivities
                  routineActivityId = {activities.routineActivityId}
                  token={token}
                  creatorName={creatorName}
                  user={user}
                />
                <DeleteRoutineActivities
                routineActivityId = {activities.routineActivityId}

                  token={token}
                  creatorName={creatorName}
                  user={user}
                />
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