import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../../api';

const Register = ({ setToken, setUser, token }) => {
  const { actionType } = useParams();
  const history = useHistory();
  console.log(actionType)


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/users/${actionType}`, {
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
      console.log(result);
      const token = result?.token;
      setPassword('');
      setUsername('');
      setToken(token);
      history.push('/profile');
     
      return result;

    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      {!token ?
        <div className="loginContainer">
          <h1>{actionType === "register" ? "Sign Up" : "Log In"}</h1>
          <form onSubmit={handleSubmit} >
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
            <button type="submit">{actionType === 'register' ? "Register" : "Log In"}</button>
            {actionType === "register"
              ? <Link to="/users/login">Already have an account? Log In here.</Link>
              : <Link to="/users/register">Need an account? Register here.</Link>
            }
          </form>
        </div>
        : <div className="loggedInDisplay">
          <p>You are already signed in!</p>
        </div>}
    </>
  )

}

export default Register;