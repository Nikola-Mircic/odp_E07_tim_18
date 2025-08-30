import React, { use, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const mockUser = {
        email: "test@example.com", 
        password: "45245"
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === mockUser.email && password === mockUser.password){
            setError("");
            localStorage.setItem("loggedIn", "true");
            navigate("/");
        }else{
            setError("Pogresan email ili lozinka");
        }
    };
    
    return (
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
    );
};

export default Login;