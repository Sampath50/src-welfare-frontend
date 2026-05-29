import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import DonateUs from './pages/DonateUs'
import ProgramsUs from './pages/ProgramsUs'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import Events from './pages/Events'
import Volunteer from './pages/Volunteer'
import FAQ from './pages/FAQ'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <BrowserRouter>
      <div>
        {/* Navigation Bar - No sticky */}
        <nav style={{ 
          backgroundColor: "#1f2937", 
          padding: "15px 20px", 
          zIndex: 1000
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <h2 style={{ color: "white", margin: 0, fontSize: "clamp(18px, 5vw, 24px)" }}>
              SRC Welfare Trust
            </h2>
            
            {/* Desktop Menu with SearchBar */}
            <div style={{ 
              display: "flex", 
              gap: "15px", 
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center"
            }} className="desktop-menu">
              <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Home</Link>
              <Link to="/about" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>About</Link>
              <Link to="/programs" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Programs</Link>
              <Link to="/gallery" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Gallery</Link>
              <Link to="/blog" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Blog</Link>
              <Link to="/events" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Events</Link>
              <Link to="/volunteer" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Volunteer</Link>
              <Link to="/faq" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>FAQ</Link>
              <Link to="/contact" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Contact</Link>
              <Link to="/donate" style={{ color: "white", textDecoration: "none", backgroundColor: "#e74c3c", padding: "5px 12px", borderRadius: "5px", fontSize: "14px" }}>Donate</Link>
              <Link to="/admin" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Admin</Link>
              <SearchBar />
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer"
              }}
              className="hamburger"
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "15px",
              paddingTop: "15px",
              borderTop: "1px solid #374151"
            }} className="mobile-menu">
              <Link to="/" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/programs" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>Programs</Link>
              <Link to="/gallery" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>Gallery</Link>
              <Link to="/blog" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link to="/events" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>Events</Link>
              <Link to="/volunteer" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>Volunteer</Link>
              <Link to="/faq" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>FAQ</Link>
              <Link to="/contact" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link to="/donate" style={{ color: "white", textDecoration: "none", backgroundColor: "#e74c3c", padding: "8px 12px", borderRadius: "5px", textAlign: "center" }} onClick={() => setMenuOpen(false)}>Donate</Link>
              <Link to="/admin" style={{ color: "white", textDecoration: "none", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>Admin</Link>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/programs" element={<ProgramsUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/donate" element={<DonateUs />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </BrowserRouter>
  )
}

export default App