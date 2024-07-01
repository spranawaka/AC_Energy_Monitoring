import React from 'react';
import GaugeChart from 'react-gauge-chart';

const GaugeDisplay = ({ value, title, min, max }) => {
  return (
    <div style={{ width: '200px', margin: 'auto' }}>
      <h3 class="text-center">{title}</h3>
      <GaugeChart
        id={`gauge-chart-${title}`}
        nrOfLevels={20}
        percent={value / max}
        textColor="#000000"
        //formatTextValue={(value) =>
        //  `${value.toFixed(2)} ${title === 'Energy' ? ' kWh' : title === 'Power' ? ' W' : title === 'Voltage' ? ' V' : ' A'}`
        //}
        needleColor="#345243"
        colors={['#FF5F6D', '#FFC371']}
        arcWidth={0.3}
        arcPadding={0.02}
      />
      <p class="text-center">{`${value.toFixed(2)} ${title === 'Energy' ? 'kWh' : title === 'Power' ? 'W' : title === 'Voltage' ? 'V' : 'A'}`}</p>
    </div>
  );
};

export default GaugeDisplay;
