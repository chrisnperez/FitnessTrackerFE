import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../api';


const UserRoutines = ({ token, user }) => {

    const myData = async (event) => {
        try {
          const response = await fetch(`${BASE_URL}/users/${user}/routines`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const result = await response.json();
          console.log(result);
          return result;
        } catch (err) {
          console.error(err);
        }
      }
      useEffect(() => {
        myData();
        // call fetchPosts() here if necessary
      });

return (
  <>
  <h2>Hello {user}! </h2>
  </>
)

}


export default UserRoutines;