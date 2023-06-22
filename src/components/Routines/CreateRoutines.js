import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../api";

const CreateRoutines = ({ token }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const [createdRoutine, setCreatedRoutine] = useState(null);
  const [routineList, setRoutineList] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await fetch(`${BASE_URL}/routines`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setRoutineList(result);
      } catch (err) {
        console.error(err);
      }
    };

    if (createdRoutine) {
      fetchRoutines();
     
    
    }
  }, [createdRoutine, token]);

  const toggleChecked = () => setIsPublic((value) => !value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic,
        }),
      });

      const result = await response.json();
      setName("");
      setGoal("");
      setIsPublic(null);
      setCreatedRoutine(result); 
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) {
    return (
      <>
        <h3>Please log in to create a routine.</h3>
      </>
    );
  }

  return (
    <>
      <h3>Create a Routine below!</h3>

      <div className="postin">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="loginuser"
            placeholder="Title Here"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="goal">Goal: </label>
          <input
            type="text"
            className="loginuser"
            placeholder="Goal here"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          />
          <label htmlFor="checkbox">Public: </label>
          <input
            type="checkbox"
            value="check"
            onChange={toggleChecked}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <h3>Routine List:</h3>
      <ul>
        {routineList.map((routine) => (
          <li key={routine.id}>{routine.name}</li>
        ))}
      </ul>
    </>
  );
};

export default CreateRoutines;
