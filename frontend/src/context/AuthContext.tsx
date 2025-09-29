// Fichier: kairn/frontend/src/context/AuthContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '@/lib/api';

// Définition du type pour le contexte
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: any, password: any) => Promise<void>;
  logout: () => void;
  register: (email: any, password: any) => Promise<any>;
  isLoading: boolean;
}

// Création du contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider du contexte
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Essaye de récupérer le token depuis le localStorage au chargement
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    localStorage.setItem('accessToken', data.access_token);
    setToken(data.access_token);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  const register = async (email: string, password: string) => {
    const data = await apiRegister(email, password);
    // L'inscription ne connecte pas automatiquement l'utilisateur,
    // donc nous ne définissons pas de token ici.
    // Nous retournons les données pour que l'appelant puisse gérer la suite (ex: redirection).
    return data;
  };

  const value = {
    isAuthenticated: !!token,
    token,
    login,
    logout,
    register,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
