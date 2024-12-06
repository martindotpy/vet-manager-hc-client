import React, { useState, useEffect } from "react";
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
import { useProduct } from "../../../hooks/useProduct";
import { ProductResponseEntity } from "../../../types";
import { getAllCategories } from "../../../services/categoryService";
import { CategoryResponseEntity } from "../../../types";

export default function ProductsPage() {
  const {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  } = useProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductResponseEntity[]>([]);
  const [categories, setCategories] = useState<CategoryResponseEntity[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponseEntity | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.content);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category_ids?.includes(Number(selectedCategory)));
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const openModal = (product: ProductResponseEntity | null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = async (product: Omit<ProductResponseEntity, "id" | "updated_at"> & { category_ids: number[] }) => {
    if (selectedProduct) {
      await editProduct(selectedProduct.id, product);
    } else {
      await addProduct(product);
    }
    closeModal();
  };

  return (
    <div id="products-page" className="w-full m-4 bg-secondary rounded-xl p-4 font-roboto">
      <div className="flex gap-2 items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <Button title="Buscar" buttonType="accent" />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Ingrese nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
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
              <TableCell sx={{ color: "white", width: "100px" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>Cargando...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6}>Error: {error}</TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <Button title="Editar" buttonType="accent" onClick={() => openModal(product)} />
                    <Button title="Eliminar" buttonType="accent" onClick={() => removeProduct(product.id)} />
                  </TableCell>
                </TableRow>
              ))
            )}
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