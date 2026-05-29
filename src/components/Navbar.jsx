import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

function Navbar() {
  return (
    <div style={{
      backgroundColor: "#1f2937",
      padding: "15px 20px",
      width: "100%",
      display: "block"
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
        
        <div style={{ 
          display: "flex", 
          gap: "15px", 
          flexWrap: "wrap", 
          alignItems: "center",
          rowGap: "10px"
        }}>
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Home</Link>
          <Link to="/about" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>About</Link>
          <Link to="/programs" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Programs</Link>
          <Link to="/gallery" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Gallery</Link>
          <Link to="/blog" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Blog</Link>
          <Link to="/events" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Events</Link>
          <Link to="/volunteer" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Volunteer</Link>
          <Link to="/faq" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>FAQ</Link>
          <Link to="/contact" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Contact</Link>
          <Link to="/donate" style={{ 
            color: "white", 
            textDecoration: "none", 
            backgroundColor: "#e74c3c", 
            padding: "5px 12px", 
            borderRadius: "5px",
            fontSize: "14px"
          }}>Donate</Link>
          <Link to="/admin" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>Admin</Link>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Navbar