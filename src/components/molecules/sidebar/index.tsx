import React, { useState } from 'react';
import Button from '../../atoms/button';
import Logo from '../../atoms/logo';
import ContentSwitcher from '../../organisms/contentSwitcher';

const Sidebar: React.FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<string>('Products');

  const handleButtonClick = (screen: string) => {
    setSelectedScreen(screen);
  };

  return (
    <div className="flex">
      <div className="w-52 h-screen bg-gradient-to-b from-[#FFFFFF] to-[#B3DDF0] flex flex-col items-center py-5">
        <div className="mb-12">
          <Logo logoType='secondary' title='' />
        </div>
        <div className="space-y-7 flex flex-col items-center">
          <Button
            buttonType='secondary'
            title="Productos"
            onClick={() => handleButtonClick('Products')}
          />
          <Button
            buttonType='secondary'
            title="Ventas"
            onClick={() => handleButtonClick('Sales')}
          />
          <Button
            buttonType='secondary'
            title="Citas"
            onClick={() => handleButtonClick('Appointments')}
          />
          <Button
            buttonType='secondary'
            title="Historial"
            onClick={() => handleButtonClick('Record')}
          />

        </div>
      </div>
      <ContentSwitcher selectedScreen={selectedScreen} />
    </div>
  );
};

export default Sidebar;