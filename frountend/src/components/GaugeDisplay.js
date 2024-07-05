import React from 'react';
import GaugeChart from 'react-gauge-chart';

const GaugeDisplay = React.memo(({ value, title, min, max }) => {
  console.log(`Rendering ${title} gauge`);
  return (
    <div style={{ width: '200px', margin: 'auto' }}>
      <h3 className="text-center">{title}</h3>
      <GaugeChart
        id={`gauge-chart-${title}`}
        nrOfLevels={20}
        percent={value / max}
        textColor="#000000"
        needleColor="#345243"
        colors={['#FF5F6D', '#FFC371']}
        arcWidth={0.3}
        arcPadding={0.02}
      />
      <p className="text-center">
        {`${value.toFixed(2)} ${title === 'Energy' ? 'kWh' : title === 'Power' ? 'W' : title === 'Voltage' ? 'V' : 'A'}`}
      </p>
    </div>
  );
});

export default GaugeDisplay;
