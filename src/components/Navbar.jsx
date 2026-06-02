import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../assets/logo.png.png"  // Using your logo from assets

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
          
          {/* YOUR LOGO FROM ASSETS FOLDER */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
            <img 
              src={logo} 
              alt="SRC Welfare Trust Logo" 
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain"
              }}
            />
            <div>
              <div style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: isScrolled ? "#333" : "white",
                transition: "color 0.3s"
              }}>
                SRC
              </div>
              <div style={{
                fontSize: "10px",
                fontWeight: "500",
                color: isScrolled ? "#e74c3c" : "#fbbf24",
                transition: "color 0.3s"
              }}>
                WELFARE TRUST
              </div>
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
                    fontSize: "14px",
                    fontWeight: location.pathname === link.path ? "600" : "400",
                    transition: "color 0.3s",
                    borderBottom: location.pathname === link.path ? "2px solid #e74c3c" : "none",
                    paddingBottom: "4px"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#e74c3c"}
                  onMouseLeave={(e) => e.target.style.color = isScrolled ? "#333" : "white"}
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
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#c0392b"
                e.target.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#e74c3c"
                e.target.style.transform = "scale(1)"
              }}>
                Donate
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: isScrolled ? "#333" : "white"
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: "absolute",
            top: "70px",
            left: 0,
            right: 0,
            background: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  color: "#333",
                  textDecoration: "none",
                  padding: "10px",
                  fontSize: "16px",
                  textAlign: "center"
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
              <button style={{
                width: "100%",
                background: "#e74c3c",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "600"
              }}>
                Donate Now
              </button>
            </Link>
          </div>
        )}
      </nav>

      <div style={{ height: "74px" }} />
    </>
  )
}

export default Navbar