import React from 'react';
import Sidebar from '../components/molecules/sidebar';

const Principal: React.FC = () => {
  return (
    <div className="principal-page">
      <Sidebar />
      <div className="content">
        {/* Main container */}
      </div>
    </div>
  );
};

export default Principal;