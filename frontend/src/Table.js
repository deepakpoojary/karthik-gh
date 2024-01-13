import React, { useEffect, useState } from 'react';

export default function Table() {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/data');
        const result = await response.json();
        setData(result);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  useEffect(() => {
    console.log('Data updated:', data);
  }, [data]);

  // Only render the component if data is loaded
  if (!dataLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <h2>Data Table</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Voting Choice</th>
          <th>Casted At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.voting_choice ? 'True' : 'False'}</td>
            <td>{item.casted_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  );
}