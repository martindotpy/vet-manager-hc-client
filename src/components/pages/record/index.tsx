import React from 'react';
import { useState } from 'react';
import Button from "../../atoms/button";
import {
  Box,
  colors,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { Close } from "@mui/icons-material";


interface Record {
  id: number;
  id_p: number;
  name: string;
  amount: number;
  disccount: number;
  entry_date: string;
}

export default function RecordPage() {
  const [records] = useState<Record[]>([
    { id: 1, id_p: 1, name: "Bigotes", amount: 10, disccount: 0, entry_date: "2021-10-10" },
    { id: 2, id_p: 2, name: "Sammy", amount: 10, disccount: 0, entry_date: "2021-10-10" },
    { id: 3, id_p: 3, name: "Pedrito", amount: 10, disccount: 0, entry_date: "2021-10-10" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("Nombre Paciente");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div id="record-page" className="w-full m-4 bg-secondary rounded-xl p-4 font-roboto">
      <div className="flex gap-2 items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <Button title="Buscar" buttonType="accent" />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Ingrese nombre..."
              sx={{ width: "240px" }}
            />
          </Box>
          <div className="flex items-center gap-1">
            <FormControl size="small" variant="outlined">
              <InputLabel>Buscar por</InputLabel>
              <Select
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                label="Buscar por"
              >
                <MenuItem value="nombre_paciente">Nombre Paciente</MenuItem>
                <MenuItem value="fecha_entrada">Fecha de Entrada</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button title="Nuevo Registro" buttonType="primary" onClick={() => setIsModalOpen(true)} />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#2B579A" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>id</TableCell>
              <TableCell sx={{ color: "white" }}>id_paciente</TableCell>
              <TableCell sx={{ color: "white" }}>Nombre_paciente</TableCell>
              <TableCell sx={{ color: "white" }}>Importe</TableCell>
              <TableCell sx={{ color: "white" }}>Descuento</TableCell>
              <TableCell sx={{ color: "white" }}>Fecha_entrada</TableCell>
              <TableCell sx={{ color: "white", width: "100px" }}>

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.id_p}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.amount}</TableCell>
                <TableCell>{record.disccount}</TableCell>
                <TableCell>{record.entry_date}</TableCell>
                <TableCell>
                  <Button title="Ver" buttonType="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Nuevo Registro
          <IconButton
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField label="Nombre" name="nombre" required fullWidth />
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select label="Categoría" name="categoria" defaultValue="">
                <MenuItem value="categoria1">Categoria 1</MenuItem>
                <MenuItem value="categoria2">Categoria 2</MenuItem>
                <MenuItem value="categoria3">Categoria 3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Precio"
              name="precio"
              type="number"
              inputProps={{ step: "0.01" }}
              required
              fullWidth
            />
            <TextField
              label="Descripción"
              name="descripcion"
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              required
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button title="Guardar" buttonType="accent" />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );

}
