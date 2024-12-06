import apiClient from "../client/apiClient";
import {
  AppointmentSaleResponseEntity,
  BillResponseEntity,
  ProductSaleResponseEntity,
  TreatmentSaleResponseEntity,
} from "../types/apiResponseEntities";
import { BillAllResponse, BillOneResponse } from "../types/apiResponses";

export async function getAllBills(
  page: number,
  size: number
): Promise<BillAllResponse> {
  const response = await apiClient.get<BillAllResponse>("/bill", {
    params: { page, size },
  });
  return response.data;
}

export async function getBillById(id: number): Promise<BillOneResponse> {
  const response = await apiClient.get<BillOneResponse>(`/bill/${id}`);
  return response.data;
}

export async function createBill(data: {
  total: number;
  discount: number;
  total_paid: number;
  client_id: number;
}): Promise<BillResponseEntity> {
  const response = await apiClient.post<BillResponseEntity>("/bill", data);
  return response.data;
}

export async function updateBill(
  id: number,
  data: Partial<BillResponseEntity>
): Promise<BillResponseEntity> {
  const response = await apiClient.put<BillResponseEntity>(`/bill/${id}`, data);
  return response.data;
}

export async function addAppointmentSaleToBill(
  id: number,
  data: {
    price: number;
    discount: number;
    appointment_id: number;
    seller_id: number;
  }
): Promise<AppointmentSaleResponseEntity> {
  const response = await apiClient.post<AppointmentSaleResponseEntity>(
    `/bill/${id}/appointment/sale`,
    data
  );
  return response.data;
}

export async function addProductToBill(
  id: number,
  data: {
    price: number;
    discount: number;
    quantity: number;
    product_id: number;
    seller_id: number;
  }
): Promise<ProductSaleResponseEntity> {
  const response = await apiClient.post<ProductSaleResponseEntity>(
    `/bill/${id}/product/sale`,
    data
  );
  return response.data;
}

export async function addTreatmentToBill(
  id: number,
  data: {
    price: number;
    discount: number;
    treatment_id: number;
    seller_id: number;
  }
): Promise<TreatmentSaleResponseEntity> {
  const response = await apiClient.post<TreatmentSaleResponseEntity>(
    `/bill/${id}/treatment/sale`,
    data
  );
  return response.data;
}

export async function generateBillExcel(): Promise<void> {
  await apiClient.get(`/bill/excel`);
}
