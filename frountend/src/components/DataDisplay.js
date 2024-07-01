import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GaugeDisplay from './GaugeDisplay';
import DataChart from './DataChart';


const DataDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data'); // Update this URL if necessary
        setData(response.data[0]);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-md-6 col-lg-3 col-12">
          <GaugeDisplay title="Amps" value={data.amperes} min={0} max={100} />
        </div>
        <div className="col-md-6 col-lg-3 col-12">
          <GaugeDisplay title="Voltage" value={data.voltage} min={0} max={250} />
        </div>
        <div className="col-md-6 col-lg-3 col-12">
          <GaugeDisplay title="Power" value={data.power} min={0} max={1000} />
        </div>
        <div className="col-md-6 col-lg-3 col-12">
          <GaugeDisplay title="Energy" value={data.energy} min={0} max={100} />
        </div>
      </div>
      <br></br>
       <DataChart />
    </div>
  );
};

export default DataDisplay;


