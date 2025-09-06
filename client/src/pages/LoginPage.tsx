import React, { use, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import LoginForma from "../components/autentifikacija/LoginForm";
import { authApi } from "../api_services/auth/AuthAPIService";
import { useAuth } from "../hooks/useAuthHook";

const LoginPage: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
		const navigate = useNavigate();

		useEffect(() => {
      console.log(isAuthenticated, user);
			if (isAuthenticated && user) navigate(`/`);
		}, []);

    return (
      LoginForma({
          authApi: authApi,
          onLoginSuccess: () => navigate("/")
      })
    );
};

export default LoginPage;

/*
<div className="max-w-md mx-auto mt-10 p-4 border rounded">
            <h1 className="text-2x1 mb-4">Login stranica</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="block">Email:</label>
                    <input 
                        type="email"
                        placeholder="Unesite email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-1" />
                </div>
                <div className="mb-2">
                    <label className="block">Lozinka:</label>
                    <input
                        type="password"
                        placeholder="Unesite lozinku"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}   
                        className="w-full border p-1" />
                </div>
                <button 
                    type="submit"
                    className="mt-2 bg-blue-500 text-white p-2 rounded">
                        Prijavi se
                    </button>
            </form>
        </div>
*/