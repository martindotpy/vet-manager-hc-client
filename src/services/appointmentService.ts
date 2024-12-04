import apiClient from "../client/apiClient";
import { AppointmentAllResponse, AppointmentOneResponse, AppointmentTypeAllResponse } from "../types";

export async function getAllAppointments({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<AppointmentAllResponse> {
  const response = await apiClient.get(`/appointment`, {
    params: { page, size },
  });
  return response.data;
}
export async function getAppointmentById({
  id,
}: {
  id: number;
}): Promise<AppointmentOneResponse> {
  const response = await apiClient.get(`/appointment/${id}`);
  return response.data;
}

export async function getAppointmentTypes(): Promise<AppointmentTypeAllResponse> {
  const response = await apiClient.get(`/appointment/type`);
  return response.data;
}