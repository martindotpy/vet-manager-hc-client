import React from "react";
import AppointmentPage from "../../pages/appointment";
import ProductsPage from "../../pages/products";
import RecordPage from "../../pages/record";
import SalesPage from "../../pages/sales";
import ClientsPage from "../../pages/clients";

interface ContentSwitcherProps {
  selectedScreen: string;
}

const ContentSwitcher: React.FC<ContentSwitcherProps> = ({
  selectedScreen,
}) => {
  switch (selectedScreen) {
    case "Products":
      return <ProductsPage />;
    case "Appointments":
      return <AppointmentPage />;
    case "Record":
      return <RecordPage />;
    case "Sales":
      return <SalesPage />;
    case "Clients":
      return <ClientsPage />;
    default:
      return <div>Escoge una sección</div>;
  }
};

export default ContentSwitcher;
