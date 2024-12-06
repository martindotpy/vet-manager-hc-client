import { useEffect, useState } from "react";
import { ClientAllResponse, OwnerResponseEntity } from "../types";
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient,
} from "../services/clientService";

export function useClient() {
  const [clients, setClients] = useState<OwnerResponseEntity[]>([]);
  const [client, setClient] = useState<OwnerResponseEntity | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async ({ page = 1, size = 10 } = {}) => {
    try {
      const response: ClientAllResponse = await getAllClients({ page, size });
      setClients(response.content);
    } catch (err) {
      setError("Error al cargar los clientes");
      console.error(err);
    } finally {
    }
  };

  const fetchClientById = async (id: number) => {
    try {
      const response = await getClientById(id);
      setClient(response.content);
    } catch (err) {
      setError("Error al cargar el cliente");
      console.error(err);
    }
  };

  const handleCreateClient = async (
    client: Omit<OwnerResponseEntity, "id">
  ) => {
    try {
      const response: OwnerResponseEntity = await createClient(client);
      setClients((prev) => [...prev, response]);
    } catch (err) {
      setError("Error al crear el cliente");
      console.error(err);
    }
  };

  const handleUpdateClient = async (
    id: number,
    client: Omit<OwnerResponseEntity, "id">
  ) => {
    try {
      const response: OwnerResponseEntity = await updateClient(id, client);
      setClients((prev) => prev.map((c) => (c.id === id ? response : c)));
    } catch (err) {
      setError("Error al actualizar el cliente");
      console.error(err);
    }
  };
  const handleDeleteClient = async (id: number) => {
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError("Error al eliminar el cliente");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    client,
    error,
    fetchClients,
    fetchClientById,
    handleCreateClient,
    handleUpdateClient,
    handleDeleteClient,
  };
}
