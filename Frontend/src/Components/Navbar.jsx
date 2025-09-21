// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-indigo-900 text-white px-6 py-3 shadow-md">
      <h1 className="text-5xl  font-extrabold">Calm</h1>
      <ul className="text-white flex space-x-6">
        <li><Link to="/" className="text-xl text-white hover:text-indigo-300">Home</Link></li>
        <li><Link to="/support" className="text-xl text-white hover:text-indigo-300">Support</Link></li>
        <li><Link to="/about" className="text-xl text-white hover:text-indigo-300">About</Link></li>
        <Link to="/prompt-history" className="text-xl text-white  hover:text-indigo-300">
          Prompt History
        </Link>
        {!isAuthenticated ? (
          <>
            <li><Link to="/login" className="text-xl text-white hover:text-indigo-300">Login</Link></li>
            <li><Link to="/signup" className="text-xl text-white hover:text-indigo-300">Sign up</Link></li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="text-xl bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
