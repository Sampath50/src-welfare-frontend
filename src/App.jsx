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
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ margin: 0, padding: 0, width: "100%" }}>
        {/* Navigation Bar */}
        <div style={{ 
          backgroundColor: "#1f2937", 
          padding: "15px 20px",
          width: "100%"
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            flexWrap: "wrap",
            maxWidth: "1400px",
            margin: "0 auto"
          }}>
            <h2 style={{ color: "white", margin: 0, fontSize: "22px" }}>
              SRC Welfare Trust
            </h2>
            
            {/* Desktop Menu */}
            <div style={{ 
              display: "flex", 
              gap: "15px", 
              flexWrap: "wrap",
              alignItems: "center"
            }} className="desktop-menu">
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
              <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
              <Link to="/programs" style={{ color: "white", textDecoration: "none" }}>Programs</Link>
              <Link to="/gallery" style={{ color: "white", textDecoration: "none" }}>Gallery</Link>
              <Link to="/blog" style={{ color: "white", textDecoration: "none" }}>Blog</Link>
              <Link to="/events" style={{ color: "white", textDecoration: "none" }}>Events</Link>
              <Link to="/volunteer" style={{ color: "white", textDecoration: "none" }}>Volunteer</Link>
              <Link to="/faq" style={{ color: "white", textDecoration: "none" }}>FAQ</Link>
              <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
              <Link to="/donate" style={{ color: "white", textDecoration: "none", backgroundColor: "#e74c3c", padding: "5px 12px", borderRadius: "5px" }}>Donate</Link>
              <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Admin</Link>
              <SearchBar />
            </div>

            {/* Hamburger Button */}
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
              <Link to="/" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/programs" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Programs</Link>
              <Link to="/gallery" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Gallery</Link>
              <Link to="/blog" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link to="/events" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Events</Link>
              <Link to="/volunteer" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Volunteer</Link>
              <Link to="/faq" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>FAQ</Link>
              <Link to="/contact" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link to="/donate" style={{ color: "white", textDecoration: "none", backgroundColor: "#e74c3c", padding: "8px 12px", borderRadius: "5px", textAlign: "center" }} onClick={() => setMenuOpen(false)}>Donate</Link>
              <Link to="/admin" style={{ color: "white", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Admin</Link>
            </div>
          )}
        </div>

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
        <WhatsAppButton />
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