import React from 'react';
import Sidebar from '../components/molecules/sidebar';

const Principal: React.FC = () => {
  return (
    <div className="principal-page">
      <Sidebar />
      <div className="content">
        {/* Main container */}
        <h1>Jojito</h1>
      </div>
    </div>
  );
};

export default Principal;