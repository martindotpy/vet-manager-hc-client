import apiClient from "../client/apiClient";
import {
  AppointmentAllResponse,
  AppointmentOneResponse,
  AppointmentTypeAllResponse,
} from "../types";

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

export async function createAppointment({
  description,
  start_at,
  patient_id,
}: {
  description: string;
  start_at: string;
  patient_id: number;
}): Promise<void> {
  await apiClient.post(`/appointment`, {
    description,
    start_at,
    patient_id,
  });
}

export async function updateAppointment({
  id,
  description,
  start_at,
  patient_id,
}: {
  id: number;
  description: string;
  start_at: string;
  patient_id: number;
}): Promise<void> {
  await apiClient.put(`/appointment/${id}`, {
    description,
    start_at,
    patient_id,
  });
}

export async function deleteAppointment({ id }: { id: number }): Promise<void> {
  await apiClient.delete(`/appointment/${id}`);
}

export async function createAppointmentDetails({
  appointment_id,
  appointment_type_id,
  duration_in_minutes,
  price,
}: {
  appointment_id: number;
  appointment_type_id: number;
  duration_in_minutes: number;
  price: number;
}): Promise<void> {
  await apiClient.post(`/appointment/${appointment_id}/details`, {
    appointment_id,
    appointment_type_id,
    duration_in_minutes,
    price,
  });
}
export async function updateAppointmentDetails({
  id,
  appointment_type_id,
  duration_in_minutes,
  price,
}: {
  id: number;
  appointment_type_id: number;
  duration_in_minutes: number;
  price: number;
}): Promise<void> {
  await apiClient.put(`/appointment/details/${id}`, {
    appointment_type_id,
    duration_in_minutes,
    price,
  });
}

export async function deleteAppointmentDetails({
  id,
}: {
  id: number;
}): Promise<{message:string}> {
  const response = await apiClient.delete(`/appointment/details/${id}`);
  return response.data;
}

export async function getAllAppointmentTypes(): Promise<AppointmentTypeAllResponse> {
  const response = await apiClient.get(`/appointment/type`);
  return response.data;
}

export async function createAppointmentType({
  name,
  duration_in_minutes,
  price,
}: {
  name: string;
  duration_in_minutes: number;
  price: number;
}): Promise<void> {
  await apiClient.post(`/appointment/type`, {
    name,
    duration_in_minutes,
    price,
  });
}

export async function updateAppointmentType({
  id,
  name,
  duration_in_minutes,
  price,
}: {
  id: number;
  name: string;
  duration_in_minutes: number;
  price: number;
}): Promise<void> {
  await apiClient.put(`/appointment/type/${id}`, {
    name,
    duration_in_minutes,
    price,
  });
}

export async function deleteAppointmentType({ id }: { id: number }): Promise<void> {
  await apiClient.delete(`/appointment/type/${id}`);
}
 export async function generateAppointmentExcel(): Promise<void> {
  await apiClient.get(`/appointment/excel`);
}
