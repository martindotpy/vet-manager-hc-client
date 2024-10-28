import apiClient from "../client/apiClient";

interface LoginResponse {
  message: string;
  content: {
    jwt: string;
  };
}

export const login = async (email: string, password: string): Promise<void> => {
  const response = await apiClient.post<LoginResponse>("/api/v0/auth/login", {
    email,
    password,
  });
  const token = response.data.content.jwt;

  localStorage.setItem("authToken", token);
};

export const logout = (): void => {
  localStorage.removeItem("authToken");
};
