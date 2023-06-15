import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";



const registerUser = async () => {

    try {
      const response = await fetch(
        `${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: 'superman27',
            password: 'krypt0n0rbust'
          }
        })
      });
      const result = await response.json();
      // As written below you can log your result
      // to check what data came back from the above code.
      console.log(result)
      return result
    } catch (err) {
      console.error(err);
    }
  }