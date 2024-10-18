import React from 'react';
import Button from '../../atoms/button';
import Logo from '../../atoms/logo';

const Sidebar: React.FC = () => {
  return (
    <div className="w-52 h-screen bg-gradient-to-b from-[#FFFFFF] to-[#B3DDF0] flex flex-col items-center py-5 ">
      <div className="mb-12">
        <Logo logoType='secondary' title='' />
      </div>
      <div className="space-y-7 flex flex-col items-center">
        <Button
          buttonType='secondary'
          title="Productos" />
        <Button
          buttonType='secondary'
          title="Citas" />
        <Button
          buttonType='secondary'
          title="Historial" />
      </div>
    </div>
  );
};

export default Sidebar;
