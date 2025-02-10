import axios from "axios";
import React, { createContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  profilePic?: string;
}

interface LoginInputs {
  username: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (inputs: LoginInputs): Promise<void> => {
    try {
      const res = await axios.post<User>(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await axios.post(
        "http://localhost:8800/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return React.createElement(
    AuthContext.Provider,
    { value: { currentUser, login, logout } },
    children
  );
};
