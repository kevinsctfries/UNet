import axios from "axios";
import React, { createContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  profilePic: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: any) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context with a default value (undefined for now)
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define the props for the provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = async (inputs: any) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8800/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed", error);
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
