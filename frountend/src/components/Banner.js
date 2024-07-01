import React from 'react';
import './Banner.css'; // Create this CSS file to style the banner

const Banner = ({ title }) => {
  return (
    <div className="banner">
      <h1>{title}</h1>
    </div>
  );
};

export default Banner;
