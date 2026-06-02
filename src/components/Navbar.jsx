import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" }
  ]

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        background: isScrolled ? "white" : "transparent",
        boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.1)" : "none",
        transition: "all 0.3s ease",
        zIndex: 1000,
        padding: "12px 0"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px"
        }}>
          
          {/* YOUR LOGO - NEW FILENAME */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img 
              src="/src-logo.png" 
              alt="SRC Logo" 
              style={{ width: "50px", height: "50px", objectFit: "contain" }} 
            />
            <div>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: isScrolled ? "#333" : "white" }}>SRC</div>
              <div style={{ fontSize: "10px", color: isScrolled ? "#e74c3c" : "#fbbf24" }}>WELFARE TRUST</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    color: isScrolled ? "#333" : "white",
                    textDecoration: "none",
                    fontSize: "14px"
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <Link to="/donate">
              <button style={{
                background: "#e74c3c",
                color: "white",
                padding: "10px 24px",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer"
              }}>
                Donate
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ height: "74px" }} />
    </>
  )
}

export default Navbar