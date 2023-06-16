import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from '../api';


const UserRoutines = ({ setToken, setUser, token }) => {

    const handleSubmit = async (event) => {

        try {
          const response = await fetch(`${BASE_URL}/users/albert/routines`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TOKEN_STRING_HERE}`
            },
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }

}