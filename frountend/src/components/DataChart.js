import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DataChart = () => {
  const [chartData, setChartData] = useState({
    amps: { labels: [], datasets: [] },
    voltage: { labels: [], datasets: [] },
    power: { labels: [], datasets: [] },
    energy: { labels: [], datasets: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://124.43.179.18:3003/data/all');
        const data = response.data;

        if (data && data.length > 0) {
          const timestamps = data.map((entry) => new Date(entry.timestamp));
          const amperes = data.map((entry) => entry.amperes);
          const voltage = data.map((entry) => entry.voltage);
          const power = data.map((entry) => entry.power);
          const energy = data.map((entry) => entry.energy);

          setChartData({
            amps: {
              labels: timestamps,
              datasets: [
                {
                  label: 'Amps (A)',
                  data: amperes,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  yAxisID: 'y-axis-1',
                },
              ],
            },
            voltage: {
              labels: timestamps,
              datasets: [
                {
                  label: 'Voltage (V)',
                  data: voltage,
                  borderColor: 'rgba(54, 162, 235, 1)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  yAxisID: 'y-axis-1',
                },
              ],
            },
            power: {
              labels: timestamps,
              datasets: [
                {
                  label: 'Power (W)',
                  data: power,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  yAxisID: 'y-axis-1',
                },
              ],
            },
            energy: {
              labels: timestamps,
              datasets: [
                {
                  label: 'Energy (kWh)',
                  data: energy,
                  borderColor: 'rgba(153, 102, 255, 1)',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  yAxisID: 'y-axis-1',
                },
              ],
            },
          });
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      'y-axis-1': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div>
      <h2>Real-time Data Chart</h2>
      <br></br>
      <div className="row">
        <div className="col-md-6">
          <h3>Amps</h3>
          <Line data={chartData.amps} options={options} />
        </div>
        <div className="col-md-6">
          <h3>Voltage</h3>
          <Line data={chartData.voltage} options={options} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h3>Power</h3>
          <Line data={chartData.power} options={options} />
        </div>
        <div className="col-md-6">
          <h3>Energy</h3>
          <Line data={chartData.energy} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DataChart;


