function AboutUs() {
  return (
    <div>
      <div style={{ backgroundColor: "#2563eb", color: "white", padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>About Us</h1>
        <p style={{ fontSize: "20px", maxWidth: "600px", margin: "0 auto" }}>Making a difference since 2015</p>
      </div>
      
      <div style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Our Mission</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.6", marginBottom: "30px", color: "#4b5563" }}>
          To empower underserved communities through education, healthcare, and social welfare programs.
        </p>
        
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Our Vision</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.6", marginBottom: "30px", color: "#4b5563" }}>
          A world where every individual has access to quality education, healthcare, and equal opportunities.
        </p>
        
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Our Impact</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "30px" }}>
          <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f3f4f6", borderRadius: "10px" }}>
            <h3 style={{ fontSize: "36px", color: "#2563eb", margin: 0 }}>8+</h3>
            <p>Years of Service</p>
          </div>
          <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f3f4f6", borderRadius: "10px" }}>
            <h3 style={{ fontSize: "36px", color: "#2563eb", margin: 0 }}>10k+</h3>
            <p>Lives Impacted</p>
          </div>
          <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f3f4f6", borderRadius: "10px" }}>
            <h3 style={{ fontSize: "36px", color: "#2563eb", margin: 0 }}>5+</h3>
            <p>Projects Running</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs