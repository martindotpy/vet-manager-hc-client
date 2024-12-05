import apiClient from "../client/apiClient";
import {
  ClientAllResponse,
  ClientOneResponse,
  OwnerResponseEntity,
} from "../types";

export async function getAllClients({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<ClientAllResponse> {
  const response = await apiClient.get(`/client`, {
    params: { page, size },
  });
  return response.data;
}
export async function getClientById(id: number): Promise<ClientOneResponse> {
  const response = await apiClient.get<{
    message: string;
    content: OwnerResponseEntity;
  }>(`/client/${id}`);
  return response.data;
}

export async function createClient(
  client: Omit<OwnerResponseEntity, "id">
): Promise<OwnerResponseEntity> {
  const response = await apiClient.post(`/client`, client);
  return response.data.content;
}

export async function updateClient(
  id: number,
  client: Omit<OwnerResponseEntity, "id">
): Promise<OwnerResponseEntity> {
  const response = await apiClient.put(`/client/${id}`, client);
  return response.data.content;
}

export async function deleteClient(id: number): Promise<{ message: string }> {
  const response = await apiClient.delete(`/client/${id}`);
  return response.data;
}

export async function generateClientExcel(): Promise<void> {
  await apiClient.get(`/client/excel`);
}
