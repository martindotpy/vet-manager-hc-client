import apiClient from "./apiClient";

export async function getAllClients(): Promise<Response> {
  return apiClient.get("client");
}

export async function getClientById({ id }: { id: number }): Promise<Response> {
  return apiClient.get(`client/${id}`);
}

export async function createClient({
  first_name,
  last_name,
  identification,
  identification_type,
  address,
}: {
  first_name: string;
  last_name: string;
  identification: string;
  identification_type: string;
  address: string;
}): Promise<Response> {
  return apiClient.post("client", {
    first_name,
    last_name,
    identification,
    identification_type,
    address,
  });
}

export async function updateClient({
  client,
  emails,
  phones,
}: {
  client: {
    id: number;
    first_name: string;
    last_name: string;
    identification: string;
    identification_type: string;
    address: string;
  };
  emails: { id?: number; email: string }[];
  phones: { id?: number; phone: string }[];
}): Promise<Response> {
  return apiClient.put(`client/${client.id}`, {
    client,
    emails,
    phones,
  });
}

export async function deleteClient({ id }: { id: number }): Promise<Response> {
  return apiClient.delete(`client/${id}`);
}
