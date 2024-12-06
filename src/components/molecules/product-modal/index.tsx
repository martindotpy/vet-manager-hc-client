import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Button from "../../atoms/button";
import { ProductResponseEntity } from "../../../types";
import { getAllCategories } from "../../../services/categoryService";
import { CategoryResponseEntity } from "../../../types";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product?: ProductResponseEntity | null;
  onSave: (product: Omit<ProductResponseEntity, "id" | "updated_at"> & { category_ids: number[] }) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = useState<Omit<ProductResponseEntity, "id" | "updated_at"> & { category_ids: number[] }>({
    name: product?.name || "",
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    description: product?.description || "",
    category_ids: [],
  });

  const [categories, setCategories] = useState<CategoryResponseEntity[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        category_ids: [],
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        category_ids: [],
      });
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.content);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    setFormData((prevData) => ({
      ...prevData,
      category_ids: [Number(e.target.value)],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {product ? "Editar Producto" : "Nuevo Producto"}
        <IconButton
          onClick={onClose}
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
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Precio"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            type="number"
            inputProps={{ step: "0.01" }}
            required
            fullWidth
          />
          <TextField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Stock"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            type="number"
            required
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={formData.category_ids[0] || ""}
              onChange={handleCategoryChange}
              label="Categoria"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button title="Guardar" buttonType="accent" />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;