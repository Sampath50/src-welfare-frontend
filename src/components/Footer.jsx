import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{ backgroundColor: "#1f2937", color: "white", padding: "40px 20px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px" }}>
        
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
            <img 
              src="/favicon.png" 
              alt="SRC Welfare Trust Logo" 
              style={{ 
                height: "40px", 
                width: "auto",
                objectFit: "contain"
              }} 
            />
            <h3>SRC Welfare Trust</h3>
          </div>
          <p>Making a difference in lives through education, healthcare, and social welfare programs.</p>
        </div>
        
        {/* Rest of your footer remains the same */}
        <div>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/" style={{ color: "#9ca3af", textDecoration: "none" }}>Home</Link></li>
            <li><Link to="/about" style={{ color: "#9ca3af", textDecoration: "none" }}>About</Link></li>
            <li><Link to="/programs" style={{ color: "#9ca3af", textDecoration: "none" }}>Programs</Link></li>
            <li><Link to="/gallery" style={{ color: "#9ca3af", textDecoration: "none" }}>Gallery</Link></li>
            <li><Link to="/blog" style={{ color: "#9ca3af", textDecoration: "none" }}>Blog</Link></li>
            <li><Link to="/events" style={{ color: "#9ca3af", textDecoration: "none" }}>Events</Link></li>
            <li><Link to="/volunteer" style={{ color: "#9ca3af", textDecoration: "none" }}>Volunteer</Link></li>
            <li><Link to="/faq" style={{ color: "#9ca3af", textDecoration: "none" }}>FAQ</Link></li>
            <li><Link to="/contact" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact</Link></li>
            <li><Link to="/donate" style={{ color: "#9ca3af", textDecoration: "none" }}>Donate</Link></li>
            <li><Link to="/admin" style={{ color: "#9ca3af", textDecoration: "none" }}>Admin</Link></li>
          </ul>
        </div>
        
        <div>
          <h4>Contact Info</h4>
          <p>📍 D.No.1-1-27/2 Plot No-2 3rd floor Kapra, Hyderabad, Telangana</p>
          <p>📞 9392302450</p>
          <p>📧 srcwelfare@info.com</p>
        </div>
        
        <div>
          <h4>Follow Us</h4>
          <div style={{ display: "flex", gap: "15px" }}>
            <a href="#" target="_blank" style={{ color: "#9ca3af", fontSize: "24px", textDecoration: "none" }}>📘</a>
            <a href="#" target="_blank" style={{ color: "#9ca3af", fontSize: "24px", textDecoration: "none" }}>🐦</a>
            <a href="#" target="_blank" style={{ color: "#9ca3af", fontSize: "24px", textDecoration: "none" }}>📷</a>
            <a href="#" target="_blank" style={{ color: "#9ca3af", fontSize: "24px", textDecoration: "none" }}>🔗</a>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: "center", paddingTop: "40px", marginTop: "20px", borderTop: "1px solid #374151", color: "#9ca3af" }}>
        <p>© 2024 SRC Welfare Trust. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer