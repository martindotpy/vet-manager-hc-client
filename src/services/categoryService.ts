import apiClient from "../client/apiClient";
import {
  CategoryListResponse,
  CategoryResponseEntity,
} from "../types";

export async function getAllCategories(): Promise<CategoryListResponse> {
  const response = await apiClient.get(`/category`);
  return response.data;
}

export async function createCategory(
  category: Omit<CategoryResponseEntity, "id">
): Promise<CategoryResponseEntity> {
  const response = await apiClient.post(`/category`, category);
  return response.data.content;
}

export async function updateCategory(
  id: number,
  category: Omit<CategoryResponseEntity, "id">
): Promise<CategoryResponseEntity> {
  const response = await apiClient.put(`/category/${id}`, category);
  return response.data.content;
}

export async function deleteCategory({
  id,
}: {
  id: number;
}): Promise<{ message: string }> {
  const response = await apiClient.delete(`/category/${id}`);
  return response.data;
}