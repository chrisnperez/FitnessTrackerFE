import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../api';


const UserRoutines = ({ token, user }) => {

    const myData = async (event) => {
      event.preventDefault();
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
        const fetchData = async () => {
          try {
            const response = await myData(token,user);
          } catch (err) {
            // handle the error, e.g. show an error message to the user
          }
        };
      
        fetchData();
        // call fetchPosts() here if necessary
      
      }, [token]);

return (
  <>
  <h2>Hello {user.username}! </h2>
  </>
)

}


export default UserRoutines;