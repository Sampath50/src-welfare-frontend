import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
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

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const isAdminPage = location.pathname === "/admin"

  return (
    <div style={{ margin: 0, padding: 0, width: "100%" }}>
      
      {!isAdminPage && (
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
            margin: "0 auto",
            gap: "15px"
          }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div style={{
                backgroundColor: "#e74c3c",
                width: "45px",
                height: "45px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "bold",
                color: "white"
              }}>
                S
              </div>
              <div>
                <div style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>SRC</div>
                <div style={{ color: "#e74c3c", fontSize: "10px" }}>WELFARE TRUST</div>
              </div>
            </Link>
            
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
              <SearchBar />
            </div>

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
            </div>
          )}
        </div>
      )}

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

      {!isAdminPage && <Footer />}
      <WhatsAppButton />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
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