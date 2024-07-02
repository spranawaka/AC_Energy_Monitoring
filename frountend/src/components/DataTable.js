import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import './Table.css'; // Import the new CSS file

const DataTable = () => {
  const [data, setData] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://124.43.179.18:3003/data/all');
        setData(response.data.reverse()); // Reverse the data so the latest is first
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="table-container">
      <div className="d-flex justify-content-end mb-3">
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary">
              <i className="fas fa-print"></i> Print Table
            </button>
          )}
          content={() => tableRef.current}
        />
      </div>
      <div ref={tableRef}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date/Time</th>
              <th scope="col">Amps (A)</th>
              <th scope="col">Voltage (V)</th>
              <th scope="col">Power (W)</th>
              <th scope="col">Energy (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>{entry.amperes}</td>
                <td>{entry.voltage}</td>
                <td>{entry.power}</td>
                <td>{entry.energy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
