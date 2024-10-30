import React, { useState } from "react";
import Button from "../../atoms/button";
import {
  Box,
  FormControl,
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
} from "@mui/material";

import ProductModal from "../../molecules/product-modal";
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}
const initialProducts: Product[] = [
  { id: 1, name: "Producto A", price: 18.2, stock: 5, category: "Categoria 1" },
  { id: 2, name: "Producto B", price: 20.0, stock: 8, category: "Categoria 2" },
  { id: 3, name: "Producto C", price: 22.5, stock: 3, category: "Categoria 3", description: "Descripcion del producto C" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("categoria1");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const openModal = (product: Product | null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  const handleSaveProduct = (product: Product) => {
    if (product.id) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProducts([...products, { ...product, id: products.length + 1 }]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };
  return (
    <div className="w-full m-4 bg-secondary rounded-xl p-4 font-roboto">
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
        <Button
          title="Nuevo Producto"
          buttonType="accent"
          onClick={() => openModal(null)}
        />
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
                  <Button title="Editar" buttonType="accent" onClick={() => openModal(product)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductModal
        open={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
