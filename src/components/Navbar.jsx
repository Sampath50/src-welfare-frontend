import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div style={{ 
      backgroundColor: "#1f2937", 
      padding: "15px 20px",
      width: "100%",
      position: "relative",
      top: 0,
      left: 0
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
          SRC Welfare Trust
        </div>
        
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>Home</a>
          <a href="/about" style={{ color: "white", textDecoration: "none" }}>About</a>
          <a href="/programs" style={{ color: "white", textDecoration: "none" }}>Programs</a>
          <a href="/gallery" style={{ color: "white", textDecoration: "none" }}>Gallery</a>
          <a href="/blog" style={{ color: "white", textDecoration: "none" }}>Blog</a>
          <a href="/events" style={{ color: "white", textDecoration: "none" }}>Events</a>
          <a href="/volunteer" style={{ color: "white", textDecoration: "none" }}>Volunteer</a>
          <a href="/faq" style={{ color: "white", textDecoration: "none" }}>FAQ</a>
          <a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
          <a href="/donate" style={{ color: "white", textDecoration: "none", backgroundColor: "#e74c3c", padding: "5px 12px", borderRadius: "5px" }}>Donate</a>
          <a href="/admin" style={{ color: "white", textDecoration: "none" }}>Admin</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar