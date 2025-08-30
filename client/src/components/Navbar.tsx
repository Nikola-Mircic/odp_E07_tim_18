import React from "react";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return ( 
        <nav className="border-b p-2 mb-4 flex gap-4">
            <Link to="/">Vesti</Link>
            <Link to="/login">Login</Link>
        </nav>
    );
};

export default Navbar;