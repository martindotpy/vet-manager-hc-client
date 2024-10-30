import React from 'react';
import { useState } from 'react';
import Button_ from '@mui/material/Button';
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
  Grid,
} from "@mui/material";


import { Close } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

interface sales {
  id_sale: number;
  id_client: number;
  name_client: string;
  price: number;
  disccount: number;
  paid: number;
  status: string;
  paid_date: string;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

export default function SalesPage() {
  const [Sales] = useState<sales[]>([
    {
      id_sale: 1,
      id_client: 1,
      name_client: "Joge",
      price: 10,
      disccount: 0,
      paid: 10,
      status: "Pagado",
      paid_date: "2021-10-10",
      created_at: "2021-10-10"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("Nombre Cliente");
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Producto asdasd",
      price: 18.2,
      stock: 5,
      category: "Categoria",
    },
    { id: 2, name: "Producto", price: 18.2, stock: 5, category: "Categoria" },
    { id: 3, name: "Producto", price: 18.2, stock: 5, category: "Categoria" },

  ]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };


  return (
    <div className="h-full w-full m-4 bg-secondary rounded-xl p-4 font-roboto">
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
                <MenuItem value="nombre_paciente">Nombre Cliente</MenuItem>
                <MenuItem value="fecha_entrada">Fecha de creación</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button title="Nueva Venta" buttonType="primary" onClick={() => setIsModalOpen(true)} />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#2B579A" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>id_venta</TableCell>
              <TableCell sx={{ color: "white" }}>id_cliente</TableCell>
              <TableCell sx={{ color: "white" }}>Nombre_cliente</TableCell>
              <TableCell sx={{ color: "white" }}>Precio</TableCell>
              <TableCell sx={{ color: "white" }}>Descuento</TableCell>
              <TableCell sx={{ color: "white" }}>Pagado</TableCell>
              <TableCell sx={{ color: "white" }}>Estado</TableCell>
              <TableCell sx={{ color: "white" }}>Fecha_pagado</TableCell>
              <TableCell sx={{ color: "white" }}>Fecha_creado</TableCell>
              <TableCell sx={{ color: "white", width: "100px" }}>

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Sales.map((sales) => (
              <TableRow key={sales.id_sale}>
                <TableCell>{sales.id_sale}</TableCell>
                <TableCell>{sales.id_client}</TableCell>
                <TableCell>{sales.name_client}</TableCell>
                <TableCell>{sales.price}</TableCell>
                <TableCell>{sales.disccount}</TableCell>
                <TableCell>{sales.paid}</TableCell>
                <TableCell>{sales.status}</TableCell>
                <TableCell>{sales.paid_date}</TableCell>
                <TableCell>{sales.created_at}</TableCell>
                <TableCell>
                  <Button title="Ver más" buttonType="primary" onClick={() => setIsViewMoreModalOpen(true)} />
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

      <Dialog
        open={isViewMoreModalOpen}
        onClose={() => setIsViewMoreModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Detalles de la Venta
          <IconButton
            onClick={() => setIsViewMoreModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

            {Sales.map((sales) => (
              <Grid container key={sales.id_sale} spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">ID Venta: {sales.id_sale}</Typography>
                  <Typography variant="h6">ID Cliente: {sales.id_client}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Nombre Cliente: {sales.name_client}</Typography>
                  <Typography variant="h6">Fecha Creado: {sales.created_at}</Typography>
                </Grid>
              </Grid>
            ))}

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID Producto</TableCell>
                  <TableCell>Nombre Producto</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Descuento</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h6">Descuento: 0</Typography>
              <Typography variant="h6">Total: 10</Typography>
              <Typography variant="h6">Monto a Pagar: 10</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );


}