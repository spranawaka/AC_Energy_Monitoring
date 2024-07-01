import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Import the new CSS file

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column">
      <div className="mb-4">
        <img src="/logo.png" alt="Logo" className="img-fluid" />
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" exact="true" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin" className="nav-link" activeClassName="active">
            Admin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/section" className="nav-link" activeClassName="active">
            Section
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/DataTable" className="nav-link" activeClassName="active">
            Data Table
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
