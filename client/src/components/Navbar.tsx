import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          MyNews
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-black">Početna</Link>
          <Link to="/login" className="text-gray-600 hover:text-black">Login</Link>
          <Link to="/profile" className="text-gray-600 hover:text-black">Profil</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
