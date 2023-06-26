import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/launches')
      .then(response => {
        const sortedLaunches = response.data.sort((a, b) => new Date(b.date_utc) - new Date(a.date_utc));
        setLaunches(sortedLaunches);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <h1>SpaceX Launch List</h1>
      {launches.map((launch) => (
        <div key={launch.id}>
          <h2>{launch.name}</h2>
          <p>Date: {formatDate(launch.date_utc)}</p>
          <p>Success: {launch.success ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default LaunchList;
