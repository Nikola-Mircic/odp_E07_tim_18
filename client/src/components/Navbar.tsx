// src/components/Navbar.tsx
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuthHook";

import { IoIosLogOut } from "react-icons/io";

export default function Navbar() {
  const {user, logout} = useAuth();

  return (
		<header className="bg-white border-b">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="text-xl font-semibold">
					MyNews
				</Link>

				<nav className="flex items-center justify-end gap-6">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`hover:underline ${isActive ? "font-semibold" : ""}`
						}
						end
					>
						Početna
					</NavLink>
					{!user ? (
						<NavLink
							to="/login"
							className={({ isActive }) =>
								`hover:underline ${isActive ? "font-semibold" : ""}`
							}
						>
							Login
						</NavLink>
					) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `hover:underline  ${isActive ? "font-semibold" : ""}`
                }
                >
                {user?.username}
              </NavLink>
              <button className="rounded-md w-min h-min p-0 m-0">
								<IoIosLogOut
									className="m-0 p-0 text-white bg-blue-600 rounded-md hover:bg-blue-700 w-8 h-8"
									onClick={logout}
								/>
							</button>
            </>
					)}
				</nav>
			</div>
		</header>
	);
}
