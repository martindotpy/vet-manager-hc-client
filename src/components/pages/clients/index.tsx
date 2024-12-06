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
import { useState } from "react";
interface Client {
  id: number;
  first_name: string;
  last_name: string;
  identification: number;
  identification_type: string;
  address: string;
}

export default function ClientsPage() {
  const [clients] = useState<Client[]>([
    {
      id: 1,
      first_name: "Juan",
      last_name: "Perez",
      identification: 74391223,
      identification_type: "DNI",
      address: "Calle 123",
    },
    {
      id: 2,
      first_name: "Maria",
      last_name: "Lopez",
      identification: 73495020,
      identification_type: "DNI",
      address: "Calle 456",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectSearchMethod, setSelectedSearchMethod] = useState("nombre");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };
  return (
    <div id="clients-page" className="w-full m-4 bg-secondary rounded-xl p-4 font-roboto">
      <div className="flex gap-2 items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <Button title="Buscar" buttonType="accent" />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Buscar por nombre..."
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
                <MenuItem value="id">id cliente</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          title="Nuevo Producto"
          buttonType="accent"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#2B579A" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>id_cliente</TableCell>
              <TableCell sx={{ color: "white" }}>Nombres</TableCell>
              <TableCell sx={{ color: "white" }}>Apellidos</TableCell>
              <TableCell sx={{ color: "white" }}>Identificación</TableCell>
              <TableCell sx={{ color: "white" }}>Tipo</TableCell>
              <TableCell sx={{ color: "white" }}>Dirección</TableCell>
              <TableCell sx={{ color: "white", width: "100px" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.first_name}</TableCell>
                <TableCell>{client.last_name}</TableCell>
                <TableCell>{client.identification}</TableCell>
                <TableCell>{client.identification_type}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>
                  <Button title="Editar" buttonType="accent" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
