function AboutUs() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>About Us</h1>
        <p style={{ fontSize: "20px", maxWidth: "600px", margin: "0 auto" }}>Making a difference since 2015</p>
      </div>
      
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Our Story Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px", color: "#e74c3c" }}>Our Story</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#4b5563", marginBottom: "20px" }}>
            SRC Welfare Trust was founded in 2015 by a group of passionate individuals who believed in the power of collective action. What started as a small community initiative has grown into a trusted NGO serving thousands of families across Telangana.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#4b5563" }}>
            Over the past 8 years, we have expanded our reach to over 50 villages, impacting more than 10,000 lives through our various programs in education, healthcare, and social welfare.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px", marginBottom: "60px" }}>
          <div style={{ backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "15px", textAlign: "center" }}>
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎯</div>
            <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#e74c3c" }}>Our Mission</h3>
            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#4b5563" }}>
              To empower underserved communities through quality education, accessible healthcare, and sustainable social welfare programs.
            </p>
          </div>
          <div style={{ backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "15px", textAlign: "center" }}>
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>👁️</div>
            <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#e74c3c" }}>Our Vision</h3>
            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#4b5563" }}>
              A world where every individual has access to quality education, healthcare, and equal opportunities regardless of their economic background.
            </p>
          </div>
          <div style={{ backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "15px", textAlign: "center" }}>
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>💎</div>
            <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#e74c3c" }}>Our Values</h3>
            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#4b5563" }}>
              Transparency, Compassion, Integrity, Inclusivity, and Sustainable Impact are the core values that guide all our actions.
            </p>
          </div>
        </div>

        {/* Key Achievements Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center", color: "#e74c3c" }}>Key Achievements</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", marginTop: "30px" }}>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "36px", color: "#e74c3c" }}>🏆</div>
              <h3 style={{ fontSize: "18px", marginTop: "10px" }}>Best NGO Award 2022</h3>
              <p>Recognized for outstanding work in education</p>
            </div>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "36px", color: "#e74c3c" }}>⭐</div>
              <h3 style={{ fontSize: "18px", marginTop: "10px" }}>80G Certification</h3>
              <p>Tax exemption for all donors</p>
            </div>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "36px", color: "#e74c3c" }}>🤝</div>
              <h3 style={{ fontSize: "18px", marginTop: "10px" }}>15+ Partners</h3>
              <p>Collaborating with leading organizations</p>
            </div>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "36px", color: "#e74c3c" }}>🌍</div>
              <h3 style={{ fontSize: "18px", marginTop: "10px" }}>50+ Villages</h3>
              <p>Reached across Telangana</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center", color: "#e74c3c" }}>Our Leadership Team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px", marginTop: "30px" }}>
            <div style={{ textAlign: "center", backgroundColor: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ width: "120px", height: "120px", backgroundColor: "#e74c3c", borderRadius: "50%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px" }}>👨‍💼</div>
              <h3 style={{ margin: "15px 0 5px 0" }}>SrHari Tanniru</h3>
              <p style={{ color: "#e74c3c", fontWeight: "bold" }}>Founder & Director</p>
              <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>15+ years of experience in social work</p>
            </div>
            <div style={{ textAlign: "center", backgroundColor: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ width: "120px", height: "120px", backgroundColor: "#e74c3c", borderRadius: "50%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px" }}>👩‍💼</div>
              <h3 style={{ margin: "15px 0 5px 0" }}>Priya Sharma</h3>
              <p style={{ color: "#e74c3c", fontWeight: "bold" }}>Co-Founder & Secretary</p>
              <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>Expert in community development</p>
            </div>
            <div style={{ textAlign: "center", backgroundColor: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ width: "120px", height: "120px", backgroundColor: "#e74c3c", borderRadius: "50%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px" }}>👨‍⚕️</div>
              <h3 style={{ margin: "15px 0 5px 0" }}>Ramu Thoka</h3>
              <p style={{ color: "#e74c3c", fontWeight: "bold" }}>Medical Director</p>
              <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>Leading healthcare initiatives</p>
            </div>
          </div>
        </div>

        {/* Impact Numbers Section */}
        <div style={{ marginBottom: "60px", backgroundColor: "#f8f9fa", padding: "40px", borderRadius: "15px" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center", color: "#e74c3c" }}>Our Impact</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px", textAlign: "center" }}>
            <div>
              <h3 style={{ fontSize: "36px", color: "#e74c3c", margin: 0 }}>8+</h3>
              <p>Years of Service</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: "#e74c3c", margin: 0 }}>10k+</h3>
              <p>Lives Impacted</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: "#e74c3c", margin: 0 }}>50+</h3>
              <p>Villages Covered</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: "#e74c3c", margin: 0 }}>100+</h3>
              <p>Active Volunteers</p>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <h2 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center", color: "#e74c3c" }}>Our Partners</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginTop: "30px" }}>
            <div style={{ backgroundColor: "white", padding: "20px 30px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>🤝 ABC Foundation</div>
            <div style={{ backgroundColor: "white", padding: "20px 30px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>🤝 XYZ Trust</div>
            <div style={{ backgroundColor: "white", padding: "20px 30px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>🤝 Rotary Club</div>
            <div style={{ backgroundColor: "white", padding: "20px 30px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>🤝 Lions Club</div>
            <div style={{ backgroundColor: "white", padding: "20px 30px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>🤝 Local Govt.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs