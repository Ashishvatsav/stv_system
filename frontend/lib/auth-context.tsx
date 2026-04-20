"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockUsers } from "./mock-data";

export type UserRole = "citizen" | "traffic_officer" | "review_officer" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  licenseNo?: string;
  badgeNo?: string;
  empId?: string;
  phone?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser = mockUsers.find((u) => u.email === email && u.password === password);

      if (!mockUser) {
        throw new Error("Invalid email or password");
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      const userData: User = {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        name: userWithoutPassword.name,
        role: userWithoutPassword.role as UserRole,
        ...(userWithoutPassword.licenseNo && { licenseNo: userWithoutPassword.licenseNo }),
        ...(userWithoutPassword.badgeNo && { badgeNo: userWithoutPassword.badgeNo }),
        ...(userWithoutPassword.empId && { empId: userWithoutPassword.empId }),
        phone: userWithoutPassword.phone,
        department: userWithoutPassword.department,
      };

      setUser(userData);
      localStorage.setItem("auth_user", JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        throw new Error("Email already registered");
      }

      // Create new user
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email,
        name,
        role,
        phone: "+1-000-000-0000",
        ...(role === "citizen" && { licenseNo: "DL" + Math.random().toString(36).substring(7).toUpperCase() }),
        ...(role === "traffic_officer" && { badgeNo: "TO-2024-" + (mockUsers.length + 1).toString().padStart(3, "0") }),
        ...(role === "review_officer" && { empId: "RO-2024-" + (mockUsers.length + 1).toString().padStart(3, "0") }),
        ...(role === "admin" && { empId: "AD-2024-" + (mockUsers.length + 1).toString().padStart(3, "0") }),
      };

      // Add to mock users (in real app, this would be API call)
      (mockUsers as any).push({
        id: newUser.id,
        email,
        password,
        name,
        role: role,
        ...(newUser.licenseNo && { licenseNo: newUser.licenseNo }),
        ...(newUser.badgeNo && { badgeNo: newUser.badgeNo }),
        ...(newUser.empId && { empId: newUser.empId }),
        phone: newUser.phone,
        department: newUser.department,
      });

      setUser(newUser);
      localStorage.setItem("auth_user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
