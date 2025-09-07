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

    return LoginForma({
			authApi: authApi,
			onSuccess: () => navigate("/"),
		});
};

export default LoginPage;