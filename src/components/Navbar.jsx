import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar() {
  return (
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
        {/* Logo Image */}
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img 
            src="/favicon.png" 
            alt="SRC Welfare Trust Logo" 
            style={{ 
              height: "50px", 
              width: "auto",
              objectFit: "contain"
            }} 
          />
        </Link>
        
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
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Navbar