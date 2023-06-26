import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CapsuleList = () => {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/capsules')
      .then(response => {
        setCapsules(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      <h1>SpaceX Capsule List</h1>
      {capsules.map((capsule) => (
        <div key={capsule.id}>
          <h2>{capsule.type}</h2>
          <p>Last Update: {capsule.last_update}</p>
        </div>
      ))}
    </div>
  );
};

export default CapsuleList;
