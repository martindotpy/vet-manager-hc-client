import apiClient from "./apiClient";

export async function getCategories(): Promise<Response> {
  return apiClient.get("category");
}

export async function createCategory({
  name,
}: {
  name: string;
}): Promise<Response> {
  return apiClient.post("category", {
    name,
  });
}

export async function updateCategory({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<Response> {
  return apiClient.put(`category/${id}`, {
    name,
  });
}

export async function deleteCategory({
  id,
}: {
  id: number;
}): Promise<Response> {
  return apiClient.delete(`category/${id}`);
}
