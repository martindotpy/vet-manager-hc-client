import apiClient from "../client/apiClient";
import {
  ProductListResponse,
  SingleProductResponse,
  ProductResponseEntity,
} from "../types";

export async function getAllProducts({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<ProductListResponse> {
  const response = await apiClient.get(`/product`, {
    params: { page, size },
  });
  return response.data;
}

export async function getProductById({
  id,
}: {
  id: number;
}): Promise<SingleProductResponse> {
  const response = await apiClient.get(`/product/${id}`);
  return response.data;
}

export async function createProduct(
  product: Omit<ProductResponseEntity, "id" | "updated_at">
): Promise<SingleProductResponse> {
  const response = await apiClient.post(`/product`, product);
  return response.data;
}

export async function updateProduct(
  id: number,
  product: Omit<ProductResponseEntity, "id" | "updated_at">
): Promise<SingleProductResponse> {
  const response = await apiClient.put(`/product/${id}`, product);
  return response.data;
}

export async function deleteProduct({
  id,
}: {
  id: number;
}): Promise<{ message: string }> {
  const response = await apiClient.delete(`/product/${id}`);
  return response.data;
}