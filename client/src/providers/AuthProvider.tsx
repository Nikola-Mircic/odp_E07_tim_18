import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthContextType } from "../types/auth/AuthContext";
import type { JwtTokenClaims } from "../types/auth/JwtTokenClaims";
import { jwtDecode } from "jwt-decode";
import type { AuthUser } from "../types/auth/AuthUser";
import { ObrišiVrednostPoKljuču, PročitajVrednostPoKljuču, SačuvajVrednostPoKljuču } from "../helpers/session_storage";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ⬇️ Dodali smo korisnickoIme?: string i exp?: number da pokrije payload iz tokena
type ClaimsWithExp = JwtTokenClaims & {
  exp?: number;
  korisnickoIme?: string;
};

const decodeJWT = (token: string): ClaimsWithExp | null => {
  try {
    const decoded = jwtDecode<ClaimsWithExp>(token);
    // dovoljni su id i uloga; korisnickoIme je opciono
    if (decoded.id && decoded.uloga) return decoded;
    return null;
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<ClaimsWithExp>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp < currentTime : false;
  } catch {
    return true;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = PročitajVrednostPoKljuču("authToken");
    if (savedToken) {
      if (isTokenExpired(savedToken)) {
        ObrišiVrednostPoKljuču("authToken");
        setIsLoading(false);
      } else {
        const claims = decodeJWT(savedToken);
        if (claims) {
          setToken(savedToken);
          setUser({ id: claims.id, uloga: claims.uloga });
        } else {
          ObrišiVrednostPoKljuču("authToken");
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    const claims = decodeJWT(newToken);
    if (claims && !isTokenExpired(newToken)) {
      setToken(newToken);
      setUser({ id: claims.id, uloga: claims.uloga });
      SačuvajVrednostPoKljuču("authToken", newToken);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    ObrišiVrednostPoKljuču("authToken");
  };

  const isAuthenticated = !!user && !!token;

  const value: AuthContextType = useMemo(
    () => ({ user, token, login, logout, isAuthenticated, isLoading }),
    [user, token, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
