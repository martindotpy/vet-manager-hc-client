import React from 'react';
import AppointmentPage from '../../pages/appointment';
import ProductsPage from '../../pages/products';
import RecordPage from '../../pages/record';
import SalesPage from '../../pages/sales';

interface ContentSwitcherProps {
  selectedScreen: string;
}

const ContentSwitcher: React.FC<ContentSwitcherProps> = ({ selectedScreen }) => {
  switch (selectedScreen) {
    case 'Products':
      return <ProductsPage />;
    case 'Appointments':
      return <AppointmentPage />;
    case 'Record':
      return <RecordPage />;
    case 'Sales':
      return <SalesPage />;
    default:
      return <div>Escoge una sección</div>;
  }
};

export default ContentSwitcher;