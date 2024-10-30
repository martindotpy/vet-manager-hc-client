import apiClient from "./apiClient";

export async function getAllProducts({
  page,
}: {
  page: number;
}): Promise<Response> {
  return apiClient.get("product", {
    params: {
      page: page,
      size: 10,
    },
  });
}

export async function getProductById({
  id,
}: {
  id: number;
}): Promise<Response> {
  return apiClient.get(`product/${id}`);
}

export async function createProduct({
  name,
  price,
  description,
  quantity,
  categories,
}: {
  name: string;
  price: number;
  description: string;
  quantity: number;
  categories: { id: number; name: string }[];
}): Promise<Response> {
  return apiClient.post("product", {
    name,
    price,
    description,
    quantity,
    categories,
  });
}

export async function updateProduct({
  id,
  name,
  price,
  description,
  quantity,
  categories,
}: {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  categories: { id: number; name: string }[];
}): Promise<Response> {
  return apiClient.put(`product/${id}`, {
    name,
    price,
    description,
    quantity,
    categories,
  });
}

export async function deleteProduct({ id }: { id: number }): Promise<Response> {
  return apiClient.delete(`product/${id}`);
}
