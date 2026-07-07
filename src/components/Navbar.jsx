import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");
  
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-black/40 backdrop-blur-md text-white">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-purple-400">
          My Portfolio
        </h1>

        <div className="hidden md:flex gap-8 items-center">

          <Link to="about" smooth={true} duration={500} className="cursor-pointer hover:text-purple-400">
            About
          </Link>

          <Link to="experience" smooth={true} duration={500} className="cursor-pointer hover:text-purple-400">
            Experience
          </Link>

          <Link to="skills" smooth={true} duration={500} className="cursor-pointer hover:text-purple-400">
            Skills
          </Link>

          <Link to="works" smooth={true} duration={500} className="cursor-pointer hover:text-purple-400">
            Works
          </Link>

          <Link to="projects" smooth={true} duration={500} className="cursor-pointer hover:text-purple-400">
            Projects
          </Link>

          <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-purple-400">
            Contact
          </Link>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <button 
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Admin Logout
            </button>
          ) : (
            <button 
              onClick={() => navigate("/login")}
              className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
            >
              AdminLogin
            </button>
          )}

        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-6 py-4 flex flex-col gap-4 border-t border-purple-500/20">
          <Link to="about" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="cursor-pointer hover:text-purple-400">
            About
          </Link>
          <Link to="experience" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="cursor-pointer hover:text-purple-400">
            Experience
          </Link>
          <Link to="skills" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="cursor-pointer hover:text-purple-400">
            Skills
          </Link>
          <Link to="works" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="cursor-pointer hover:text-purple-400">
            Works
          </Link>
          <Link to="projects" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="cursor-pointer hover:text-purple-400">
            Projects
          </Link>
          <Link to="contact" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="cursor-pointer hover:text-purple-400">
            Contact
          </Link>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm w-fit"
            >
              Admin Logout
            </button>
          ) : (
            <button
              onClick={() => { setMenuOpen(false); navigate("/login"); }}
              className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm w-fit"
            >
              AdminLogin
            </button>
          )}
        </div>
      )}

    </nav>
  );
}

export default Navbar;