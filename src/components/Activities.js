import React from 'react';
import { BASE_URL } from '../api';


const Activities = () => {

    const myData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/activities`, {
            headers: {
              'Content-Type': 'application/json',
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

export default Activities;