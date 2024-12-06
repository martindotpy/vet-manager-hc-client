import { useEffect, useState, useCallback } from "react";
import {
  ProductListResponse,
  ProductResponseEntity,
} from "../types";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export function useProduct() {
  const [products, setProducts] = useState<ProductResponseEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async ({ page = 1, size = 10 } = {}) => {
    try {
      setIsLoading(true);
      const response: ProductListResponse = await getAllProducts({ page, size });
      setProducts(response.content);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductById = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await getProductById({ id });
      return response.content;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (product: Omit<ProductResponseEntity, "id" | "updated_at"> & { category_ids: number[] }) => {
    try {
      setIsLoading(true);
      console.log("Adding product:", product); // Log the request payload
      const response = await createProduct(product);
      setProducts((prevProducts) => [...prevProducts, response.content]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const editProduct = async (id: number, product: Omit<ProductResponseEntity, "id" | "updated_at"> & { category_ids: number[] }) => {
    try {
      setIsLoading(true);
      const response = await updateProduct(id, product);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? response.content : p))
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteProduct({ id });
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    addProduct,
    editProduct,
    removeProduct,
  };
}