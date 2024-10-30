import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Button from "../../atoms/button";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = React.useState<Product>({
    id: product?.id || 0,
    name: product?.name || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category || "",
    description: product?.description || "",
  });

  React.useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
        category: "",
        description: "",
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
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
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              label="Categoría"
              name="category"
              value={formData.category}
              required
            >
              <MenuItem value="categoria1">Categoria 1</MenuItem>
              <MenuItem value="categoria2">Categoria 2</MenuItem>
              <MenuItem value="categoria3">Categoria 3</MenuItem>
            </Select>
          </FormControl>
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
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
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
  );
};

export default ProductModal;
