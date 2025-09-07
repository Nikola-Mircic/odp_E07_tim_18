// src/components/Navbar.tsx
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          MyNews
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-semibold" : ""}`
            }
            end
          >
            Početna
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-semibold" : ""}`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-semibold" : ""}`
            }
          >
            Profil
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
