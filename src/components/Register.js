import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../api';



const Register = () => {
  // const params = useParams();
  // const{actionType} = params;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username,password);
    try {
      const response = await fetch(
        `${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        
            username: username,
            password: password
          
        })
      });
      const result = await response.json();
      // As written below you can log your result
      // to check what data came back from the above code.
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }




  return (
    <>
      <div className="login-container">
        <h1>Test form</h1>
        <form onSubmit={handleSubmit}>
          <div >
            <label htmlFor="username">Username: </label>
            <input
              required
              label="Username"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>
          <div >
            <label htmlFor="password">Password: </label>
            <input
              required
              label="Password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Submit</button>

        </form>


      </div>


    </>
  )

}

export default Register;