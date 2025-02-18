import {useContext, useState, ReactNode, useEffect, createContext } from "react";
import { loginService, refreshTokenService } from "../../api/authService";


// Definición del tipo de usuario
export interface AuthUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  dni: string;
  role: string;
  birth_date: string;
}

// Definición del contexto
interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: (refresh_token : string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const refresh_token = localStorage.getItem("refreshToken");
      if (refresh_token) {
        refreshToken(refresh_token).finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { access_token, refresh_token, user } = await loginService(email, password);
    localStorage.setItem("token", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const refreshToken = async (refresh_token: string) => {
    try {
      const { access_token, user } = await refreshTokenService(refresh_token);
      if (access_token && user) {
        localStorage.setItem("token", access_token);
        setUser(user);
      } else {
        logout();
      }}
    catch(error){
      console.log("Error inesperado: ", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};