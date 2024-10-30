import React, { useState } from "react";
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

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

export default function ProductsPage() {
  const [products] = useState<Product[]>([
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("categoria1");

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
            <p className="text-black">Categoria</p>
            <FormControl size="small" variant="outlined">
              <InputLabel>Seleccionar categoría</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Seleccionar categoría"
              >
                <MenuItem value="categoria1">Categoria 1</MenuItem>
                <MenuItem value="categoria2">Categoria 2</MenuItem>
                <MenuItem value="categoria3">Categoria 3</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button title="Nuevo Producto" buttonType="accent" onClick={() => setIsModalOpen(true)} />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#2B579A" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>id</TableCell>
              <TableCell sx={{ color: "white" }}>Nombre</TableCell>
              <TableCell sx={{ color: "white" }}>Precio</TableCell>
              <TableCell sx={{ color: "white" }}>Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Categoria</TableCell>
              <TableCell sx={{ color: "white", width: "100px" }}>
                Acciones
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
                <TableCell>
                  <Button title="Editar" buttonType="accent" />
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
          Nuevo Producto
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
