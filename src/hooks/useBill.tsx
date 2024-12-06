import { useState, useEffect } from "react";
import {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  addAppointmentSaleToBill,
  addProductToBill,
  addTreatmentToBill,
  generateBillExcel,
} from "../services/billService";
import {
  BillResponseEntity,
  BillAllResponse,
  BillOneResponse,
  AppointmentSaleResponseEntity,
  ProductSaleResponseEntity,
  TreatmentSaleResponseEntity,
} from "../types";

export function useBill() {
  const [bills, setBills] = useState<BillResponseEntity[]>([]);
  const [bill, setBill] = useState<BillResponseEntity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = async ({ page = 1, size = 10 } = {}) => {
    try {
      setIsLoading(true);
      const response: BillAllResponse = await getAllBills(page, size);
      setBills(response.content);
    } catch (err) {
      setError("Error al cargar las facturas");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBillById = async (id: number) => {
    try {
      setIsLoading(true);
      const response: BillOneResponse = await getBillById(id);
      setBill(response.content);
    } catch (err) {
      setError("Error al cargar la factura");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBill = async (data: {
    total: number;
    discount: number;
    total_paid: number;
    client_id: number;
  }) => {
    try {
      setIsLoading(true);
      const newBill: BillResponseEntity = await createBill(data);
      setBills((prev) => [...prev, newBill]);
      return newBill;
    } catch (err) {
      setError("Error al crear la factura");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBill = async (
    id: number,
    data: Partial<BillResponseEntity>
  ) => {
    try {
      setIsLoading(true);
      const updatedBill: BillResponseEntity = await updateBill(id, data);
      setBills((prev) =>
        prev.map((bill) => (bill.id === id ? updatedBill : bill))
      );
      return updatedBill;
    } catch (err) {
      setError("Error al actualizar la factura");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAppointmentSale = async (
    id: number,
    data: {
      price: number;
      discount: number;
      appointment_id: number;
      seller_id: number;
    }
  ) => {
    try {
      setIsLoading(true);
      const sale: AppointmentSaleResponseEntity =
        await addAppointmentSaleToBill(id, data);
      return sale;
    } catch (err) {
      setError("Error al agregar cita a la factura");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProductSale = async (
    id: number,
    data: {
      price: number;
      discount: number;
      quantity: number;
      product_id: number;
      seller_id: number;
    }
  ) => {
    try {
      setIsLoading(true);
      const sale: ProductSaleResponseEntity = await addProductToBill(id, data);
      return sale;
    } catch (err) {
      setError("Error al agregar producto a la factura");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTreatmentSale = async (
    id: number,
    data: {
      price: number;
      discount: number;
      treatment_id: number;
      seller_id: number;
    }
  ) => {
    try {
      setIsLoading(true);
      const sale: TreatmentSaleResponseEntity = await addTreatmentToBill(
        id,
        data
      );
      return sale;
    } catch (err) {
      setError("Error al agregar tratamiento a la factura");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBillExcel = async () => {
    try {
      setIsLoading(true);
      await generateBillExcel();
    } catch (err) {
      setError("Error al generar el Excel de facturas");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return {
    bills,
    bill,
    isLoading,
    error,
    fetchBills,
    fetchBillById,
    handleCreateBill,
    handleUpdateBill,
    handleAddAppointmentSale,
    handleAddProductSale,
    handleAddTreatmentSale,
    handleGenerateBillExcel,
  };
}
