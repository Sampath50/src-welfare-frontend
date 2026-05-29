import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-blue-700 text-white">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          SRC Welfare Trust
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 gap-4 text-lg bg-blue-800">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link to="/programs" onClick={() => setMenuOpen(false)}>
            Programs
          </Link>

          <Link to="/donate" onClick={() => setMenuOpen(false)}>
            Donate
          </Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

        </div>
      )}

    </nav>
  )
}

export default Navbar