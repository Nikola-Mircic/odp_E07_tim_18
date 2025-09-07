import { useNavigate } from "react-router-dom";
import LoginForma from "../components/autentifikacija/LoginForm";
import { authApi } from "../api_services/auth/AuthAPIService";
import { useAuth } from "../hooks/useAuthHook";
import { useEffect } from "react";
import RegisterForm from "../components/autentifikacija/RegisterForm";

const LoginPage: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      console.log(isAuthenticated, user);
      if (isAuthenticated && user) navigate(`/`);
    }, []);

    return RegisterForm({
			authApi: authApi,
			onSuccess: () => navigate("/"),
		});
};

export default LoginPage;