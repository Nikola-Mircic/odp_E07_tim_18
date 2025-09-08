import { useContext } from "react";
import type { AuthContextType } from "../types/auth/AuthContext";
import { AuthContext } from "../providers/AuthProvider";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth mora biti korišćen unutar AuthProvider-a");
  return context;
};
