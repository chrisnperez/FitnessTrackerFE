import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../api";

const CreateActivities = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdActivity, setCreatedActivity] = useState(null);
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${BASE_URL}/activities`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setActivityList(result);
      } catch (err) {
        console.error(err);
      }
    };

    if (createdActivity) {
      fetchActivities();
     
    }
  }, [createdActivity, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      const result = await response.json();
      setName("");
      setDescription("");
      setCreatedActivity(result); 
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) {
    return (
      <>
        <h3>Please log in to create an activity.</h3>
      </>
    );
  }

  return (
    <>
      <h3>Create an activity below!</h3>

      <div className="postin">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Activity Name:</label>
          <input
            type="text"
            className="loginuser"
            placeholder="Title Here"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="loginuser"
            placeholder="Description here"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
          <button type="submit">Create Activity</button>
        </form>
      </div>

      <h3>Activity List:</h3>
      <ul>
        {activityList.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </>
  );
};

export default CreateActivities;
