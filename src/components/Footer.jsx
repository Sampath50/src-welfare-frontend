function Footer() {
  return (
    <footer style={{ backgroundColor: "#1f2937", color: "white", padding: "40px 20px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px" }}>
        <div>
          <h3>SRC Welfare Trust</h3>
          <p>Making a difference in lives through education, healthcare, and social welfare programs.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="/" style={{ color: "#9ca3af", textDecoration: "none" }}>Home</a></li>
            <li><a href="/about" style={{ color: "#9ca3af", textDecoration: "none" }}>About</a></li>
            <li><a href="/programs" style={{ color: "#9ca3af", textDecoration: "none" }}>Programs</a></li>
            <li><a href="/gallery" style={{ color: "#9ca3af", textDecoration: "none" }}>Gallery</a></li>
            <li><a href="/contact" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact</a></li>
            <li><a href="/donate" style={{ color: "#9ca3af", textDecoration: "none" }}>Donate</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Info</h4>
          <p>📍 123 Welfare Street, New Delhi, India</p>
          <p>📞 +91 12345 67890</p>
          <p>📧 info@srcwelfare.org</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div style={{ display: "flex", gap: "15px" }}>
            <a href="#" style={{ color: "#9ca3af", fontSize: "24px", textDecoration: "none" }}>📘</a>
            <a href="#" style={{ color: "#9ca3af", fontSize: "24px", textDecoration: "none" }}>🐦</a>
            <a href="#" style={{ color: "#9ca3af", fontSize: "24px", textDecoration: "none" }}>📷</a>
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