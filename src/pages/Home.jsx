import { useState, useEffect } from "react"

function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus(""), 3000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus(""), 3000)
      }
    } catch (error) {
      setStatus("error")
      setTimeout(() => setStatus(""), 3000)
    }
  }

  const stats = [
    { number: "500+", label: "Families Helped", icon: "👨‍👩‍👧‍👦" },
    { number: "1200+", label: "Students Supported", icon: "📚" },
    { number: "50+", label: "Medical Camps", icon: "🏥" },
    { number: "100+", label: "Volunteers", icon: "🤝" }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        height: "100vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundAttachment: "fixed"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)"
        }}></div>
        
        <div style={{ position: "relative", textAlign: "center", color: "white", padding: "20px", animation: animate ? "fadeInUp 1s ease-out" : "none" }}>
          <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>SRC Welfare Trust</h1>
          <p style={{ fontSize: "22px", maxWidth: "700px", margin: "0 auto" }}>
            Together we can support education, healthcare, food drives, and social welfare programs.
          </p>
          <a href="/donate">
            <button style={{
              marginTop: "30px",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "15px 40px",
              border: "none",
              borderRadius: "50px",
              fontSize: "18px",
              cursor: "pointer",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
              Donate Now ❤️
            </button>
          </a>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f3f4f6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", textAlign: "center" }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              backgroundColor: "white", 
              padding: "40px 30px", 
              borderRadius: "15px",
              transition: "transform 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: "50px" }}>{stat.icon}</div>
              <h2 style={{ fontSize: "48px", color: "#2563eb", margin: "10px 0" }}>{stat.number}</h2>
              <p style={{ fontSize: "18px", color: "#666" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>Our Mission</h2>
          <p style={{ fontSize: "18px", color: "#666", maxWidth: "800px", margin: "0 auto 40px" }}>
            To empower underserved communities through education, healthcare, and social welfare programs.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginTop: "40px" }}>
            <div style={{ padding: "30px" }}>
              <div style={{ fontSize: "40px" }}>🎯</div>
              <h3>Our Vision</h3>
              <p>A world with equal opportunities for all</p>
            </div>
            <div style={{ padding: "30px" }}>
              <div style={{ fontSize: "40px" }}>💪</div>
              <h3>Our Impact</h3>
              <p>Transforming lives through action</p>
            </div>
            <div style={{ padding: "30px" }}>
              <div style={{ fontSize: "40px" }}>🤝</div>
              <h3>Our Promise</h3>
              <p>100% transparency in all activities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "48px", textAlign: "center" }}>Contact Us</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "50px" }}>Have questions? We'd love to hear from you.</p>

          {status === "success" && <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>✅ Message sent successfully!</div>}
          {status === "error" && <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>❌ Failed to send. Please try again.</div>}
          {status === "sending" && <div style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>📧 Sending message...</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Message</label>
              <textarea rows="5" name="message" value={formData.message} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}></textarea>
            </div>
            <button type="submit" disabled={status === "sending"} style={{ width: "100%", backgroundColor: "#2563eb", color: "white", padding: "14px", border: "none", borderRadius: "50px", fontSize: "16px", cursor: "pointer" }}>
              {status === "sending" ? "Sending..." : "Send Message ✉️"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Home