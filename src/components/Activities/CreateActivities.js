import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../api";
import { useHistory } from "react-router-dom";

const CreateActivities = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description
        })
      });

      const result = await response.json();
      setName('');
      setDescription('');
      return result;
    } catch (err) {
      console.error(err);
    }
  }

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
    </>
  );
}

export default CreateActivities;
