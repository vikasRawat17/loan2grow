import { motion } from "framer-motion";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleClick = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div className="min-h-screen flex flex-col">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg py-1"
            : "bg-white/90 backdrop-blur-sm py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              MyApp
            </motion.div>

            <div className="hidden md:block">
              <ul className="flex gap-8 text-gray-700 font-medium">
                <motion.li
                  onClick={() => navigate("/")}
                  whileHover={{ scale: 1.1, color: "#3B82F6" }}
                  className="cursor-pointer transition-colors relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.li>
                <motion.li
                  onClick={() => navigate("/")}
                  whileHover={{ scale: 1.1, color: "#3B82F6" }}
                  className="cursor-pointer transition-colors relative group"
                >
                  Products
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.li>
                <motion.li
                  onClick={() => navigate("/cart")}
                  whileHover={{ scale: 1.1, color: "#3B82F6" }}
                  className="cursor-pointer transition-colors relative group"
                >
                  Cart
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.li>
                {isAuthenticated ? (
                  <motion.li whileHover={{ scale: 1.05 }} className="relative">
                    <div
                      onClick={handleClick}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors font-medium"
                    >
                      {user.firstName.charAt(0)}
                    </div>
                  </motion.li>
                ) : (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-1 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    Login
                  </motion.li>
                )}
              </ul>
            </div>

            <div className="md:hidden flex items-center gap-2">
              {isAuthenticated && (
                <div
                  onClick={handleClick}
                  className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors font-medium mr-2"
                >
                  {user?.firstName
                    ? user.firstName.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="flex-grow ">
        <Outlet />
      </main>

      <footer className="bg-gray-50 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}

export default Navbar;
