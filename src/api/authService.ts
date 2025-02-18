import { AuthUser } from "../components/context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

// Login: Llamada al backend para obtener el token
export const loginService = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

// Refresh token: Llamada al backend para obtener un nuevo token
export const refreshTokenService = async (refresh_token: string) => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${refresh_token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return data;
};