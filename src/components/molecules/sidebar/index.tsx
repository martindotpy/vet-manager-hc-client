import React, { useState } from "react";
import Button from "../../atoms/button";
import Logo from "../../atoms/logo";
import ContentSwitcher from "../../organisms/contentSwitcher";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<string>("Products");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = (screen: string) => {
    setSelectedScreen(screen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const buttons = [
    { title: "Productos", screen: "Products" },
    { title: "Ventas", screen: "Sales" },
    { title: "Citas", screen: "Appointments" },
    { title: "Historial", screen: "Record" },
    { title: "Clientes", screen: "Clients" },
  ];

  return (
    <div className="flex">
      <div className="w-52 h-screen bg-gradient-to-b from-[#FFFFFF] to-[#B3DDF0] flex flex-col items-center py-5">
        <div className="mb-12">
          <Logo logoType="secondary" title="" />
          <Button
            buttonType="primary"
            title="Cerrar sesión"
            onClick={handleLogout}
          />
        </div>
        <div className="space-y-7 flex flex-col items-center">
          {buttons.map(({ title, screen }) => (
            <Button
              key={screen}
              buttonType={selectedScreen === screen ? "accent" : "secondary"}
              title={title}
              onClick={() => handleButtonClick(screen)}
            />
          ))}
        </div>
      </div>
      <ContentSwitcher selectedScreen={selectedScreen} />
    </div>
  );
};

export default Sidebar;