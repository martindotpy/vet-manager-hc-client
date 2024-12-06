import { Close } from "@mui/icons-material";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import { MenuItem } from "@mui/material";

import Button from "../../atoms/button";
import { useEffect, useState } from "react";
import { useClient } from "../../../hooks/useClient";
export default function ClientsPage() {
  const {
    clients,
    fetchClients,
    handleCreateClient,
    handleUpdateClient,
    handleDeleteClient,
  } = useClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectSearchMethod, setSelectedSearchMethod] = useState("nombre");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingClient, setEditingClient] = useState<any>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) => {
    if (selectSearchMethod === "nombre") {
      return (
        client.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectSearchMethod === "id") {
      return client.id?.toString().includes(searchQuery);
    }
    return true;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const clientData = {
      id: editingClient?.id,
      first_name: editingClient.first_name,
      last_name: editingClient.last_name,
      identification: editingClient.identification,
      identification_type: editingClient.identification_type,
      address: editingClient.address,
      emails: editingClient?.id ? editingClient.emails || [] : undefined,
      phones: editingClient?.id ? editingClient.phones || [] : undefined,
    };
    if (editingClient?.id) {
      clientData.emails = editingClient.emails || [];
      clientData.phones = editingClient.phones || [];
    }

    if (editingClient?.id) {
      handleUpdateClient(editingClient.id, clientData);
      fetchClients();
    } else {
      handleCreateClient(clientData);
      fetchClients();
    }

    setIsModalOpen(false);
    setEditingClient(null);
    fetchClients();
  };

  const handleEdit = (client: any) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    handleDeleteClient(id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingClient(null);
    fetchClients();
  };

  return (
    <div
      id="clients-page"
      className="w-full m-4 bg-secondary rounded-xl p-4 font-roboto"
    >
      <div className="flex gap-2 items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <Button title="Buscar" buttonType="accent" />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              placeholder={`Buscar por ${selectSearchMethod}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: "240px" }}
            />
          </Box>
          <div className="flex items-center gap-1">
            <FormControl size="small" variant="outlined">
              <InputLabel>Buscar por</InputLabel>
              <Select
                value={selectSearchMethod}
                onChange={(e) => setSelectedSearchMethod(e.target.value)}
                label="Seleccionar"
              >
                <MenuItem value="nombre">Nombre de cliente</MenuItem>
                <MenuItem value="id">ID del cliente</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          title="Agregar cliente"
          buttonType="accent"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#2B579A" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Nombres</TableCell>
              <TableCell sx={{ color: "white" }}>Apellidos</TableCell>
              <TableCell sx={{ color: "white" }}>Identificación</TableCell>
              <TableCell sx={{ color: "white" }}>Tipo</TableCell>
              <TableCell sx={{ color: "white" }}>Dirección</TableCell>
              <TableCell sx={{ color: "white", width: "150px" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.first_name}</TableCell>
                <TableCell>{client.last_name}</TableCell>
                <TableCell>{client.identification}</TableCell>
                <TableCell>{client.identification_type}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>
                  <Button
                    title="Editar"
                    buttonType="accent"
                    onClick={() => handleEdit(client)}
                  />
                  <Button
                    title="Eliminar"
                    buttonType="secondary"
                    onClick={() => handleDelete(client.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>
          {editingClient ? "Editar Cliente" : "Agregar Cliente"}
          <IconButton
            onClick={handleModalClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombres"
              fullWidth
              margin="dense"
              value={editingClient?.first_name || ""}
              onChange={(e) =>
                setEditingClient((prev: any) => ({
                  ...prev,
                  first_name: e.target.value,
                }))
              }
              required
            />
            <TextField
              label="Apellidos"
              fullWidth
              margin="dense"
              value={editingClient?.last_name || ""}
              onChange={(e) =>
                setEditingClient((prev: any) => ({
                  ...prev,
                  last_name: e.target.value,
                }))
              }
              required
            />
            <TextField
              label="Identificación"
              fullWidth
              margin="dense"
              value={editingClient?.identification || ""}
              onChange={(e) =>
                setEditingClient((prev: any) => ({
                  ...prev,
                  identification: e.target.value,
                }))
              }
              required
            />
            <TextField
              label="Tipo de Identificación"
              fullWidth
              margin="dense"
              value={editingClient?.identification_type || ""}
              onChange={(e) =>
                setEditingClient((prev: any) => ({
                  ...prev,
                  identification_type: e.target.value,
                }))
              }
              required
            />
            <TextField
              label="Dirección"
              fullWidth
              margin="dense"
              value={editingClient?.address || ""}
              onChange={(e) =>
                setEditingClient((prev: any) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              required
            />
            {editingClient?.id && (
              <>
                <TextField
                  label="Email"
                  fullWidth
                  margin="dense"
                  value={editingClient?.emails?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingClient((prev: any) => ({
                      ...prev,
                      emails: e.target.value
                        .split(",")
                        .map((email: string) => email.trim()),
                    }))
                  }
                />
                <TextField
                  label="Phones"
                  fullWidth
                  margin="dense"
                  value={editingClient?.phones?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingClient((prev: any) => ({
                      ...prev,
                      phones: e.target.value
                        .split(",")
                        .map((phone: string) => phone.trim()),
                    }))
                  }
                />
              </>
            )}
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <button type="submit">
                <Button title="Guardar" buttonType="accent" />
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
