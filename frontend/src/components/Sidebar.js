import React from 'react';
import { Link } from 'react-router-dom';  

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/visualize">Visualization</Link>
    </div>
  );
}

export default Sidebar;
