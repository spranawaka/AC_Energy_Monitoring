import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GaugeDisplay from './GaugeDisplay';
import DataChart from './DataChart';

const DataDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://124.43.179.18:3003/data'); // Update this URL if necessary
        setData(response.data[0]);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 100); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  console.log(`Rendering  gauge`);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <br />
      <div className="row">
        <div className="col-md-6 col-lg-3 col-12">
          <GaugeDisplay title="Amps" value={data.amperes} min={0} max={100} />
        </div>
        <div className="col-md-6 col-lg-3 col-12">
          <GaugeDisplay title="Voltage" value={data.voltage} min={0} max={250} />
        </div>
        <div className="col-md-6 col-lg-3 col-12">
          <GaugeDisplay title="Power" value={data.power} min={0} max={2000} />
        </div>
        <div className="col-md-6 col-lg-3 col-12">
          <GaugeDisplay title="Energy" value={data.energy} min={0} max={1000} />
        </div>
      </div>
      <br />
      <DataChart />
    </div>
  );
};

export default DataDisplay;
