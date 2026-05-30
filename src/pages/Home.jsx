import { useState, useEffect } from "react"

function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")
  const [animate, setAnimate] = useState(false)
  const [content, setContent] = useState({
    hero: { title: "SRC Welfare Trust", subtitle: "Together we can support education, healthcare, food drives, and social welfare programs." },
    stats: [{ number: "500+", label: "Families Helped" }, { number: "1200+", label: "Students Supported" }, { number: "50+", label: "Medical Camps" }, { number: "100+", label: "Volunteers" }],
    mission: { title: "Our Mission", text: "To empower underserved communities through education, healthcare, and social welfare programs." }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAnimate(true)
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/content/home/all")
      const data = await response.json()
      if (data.success && data.contents) {
        const newContent = { ...content }
        data.contents.forEach(item => {
          if (item.section === "hero") newContent.hero = item.data
          if (item.section === "stats") newContent.stats = item.data
          if (item.section === "mission") newContent.mission = item.data
        })
        setContent(newContent)
      }
    } catch (error) {
      console.error("Error fetching content:", error)
    } finally {
      setLoading(false)
    }
  }

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

  const stats = content.stats
  const impactNumbers = [
    { number: "10+", label: "Villages Covered", icon: "🏘️" },
    { number: "25+", label: "Events Organized", icon: "🎉" },
    { number: "15+", label: "Partner NGOs", icon: "🤝" },
    { number: "200+", label: "Active Donors", icon: "❤️" }
  ]

  const testimonials = [
    { name: "Rajesh Kumar", role: "Parent", text: "SRC Welfare Trust helped my daughter continue her education. Forever grateful!", rating: 5 },
    { name: "Priya Sharma", role: "Volunteer", text: "Working with this organization has been life-changing. Their dedication is inspiring.", rating: 5 },
    { name: "Dr. Suresh Reddy", role: "Partner", text: "Their medical camps have brought healthcare to remote villages.", rating: 5 }
  ]

  if (loading) {
    return <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
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
          backgroundColor: "rgba(0,0,0,0.65)"
        }}></div>
        
        <div style={{ position: "relative", textAlign: "center", color: "white", padding: "20px", animation: animate ? "fadeInUp 1s ease-out" : "none" }}>
          <h1 style={{ fontSize: "65px", marginBottom: "20px", fontWeight: "bold" }}>{content.hero.title}</h1>
          <p style={{ fontSize: "24px", maxWidth: "700px", margin: "0 auto", lineHeight: "1.4" }}>
            {content.hero.subtitle}
          </p>
          <div style={{ marginTop: "40px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/donate">
              <button style={{
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "15px 40px",
                border: "none",
                borderRadius: "50px",
                fontSize: "18px",
                cursor: "pointer",
                transition: "transform 0.3s",
                fontWeight: "bold"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
                Donate Now ❤️
              </button>
            </a>
            <a href="/programs">
              <button style={{
                backgroundColor: "transparent",
                color: "white",
                padding: "15px 40px",
                border: "2px solid white",
                borderRadius: "50px",
                fontSize: "18px",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
                Our Programs
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "42px", textAlign: "center", marginBottom: "15px" }}>Our Impact in Numbers</h2>
          <p style={{ textAlign: "center", fontSize: "18px", color: "#666", marginBottom: "60px" }}>Making a real difference in communities</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px", textAlign: "center" }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ 
                backgroundColor: "white", 
                padding: "40px 25px", 
                borderRadius: "15px",
                transition: "transform 0.3s",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <h2 style={{ fontSize: "52px", color: "#e74c3c", margin: "15px 0 5px 0", fontWeight: "bold" }}>{stat.number}</h2>
                <h3 style={{ fontSize: "22px", margin: "10px 0" }}>{stat.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>{content.mission.title}</h2>
          <p style={{ fontSize: "20px", color: "#555", maxWidth: "800px", margin: "0 auto 60px", lineHeight: "1.6" }}>
            {content.mission.text}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginTop: "40px" }}>
            <div style={{ padding: "30px", backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
              <div style={{ fontSize: "50px" }}>🎯</div>
              <h3 style={{ fontSize: "26px", margin: "20px 0 10px" }}>Our Vision</h3>
              <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>A world with equal opportunities for all</p>
            </div>
            <div style={{ padding: "30px", backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
              <div style={{ fontSize: "50px" }}>💪</div>
              <h3 style={{ fontSize: "26px", margin: "20px 0 10px" }}>Our Impact</h3>
              <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>Transforming lives through action</p>
            </div>
            <div style={{ padding: "30px", backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
              <div style={{ fontSize: "50px" }}>🤝</div>
              <h3 style={{ fontSize: "26px", margin: "20px 0 10px" }}>Our Promise</h3>
              <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>100% transparency in all activities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your sections... */}
      {/* Impact Numbers Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#e74c3c", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>Quick Impact Overview</h2>
          <p style={{ fontSize: "18px", marginBottom: "60px", opacity: 0.9 }}>Our reach across communities</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
            {impactNumbers.map((item, index) => (
              <div key={index}>
                <div style={{ fontSize: "60px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "44px", margin: "15px 0 5px", fontWeight: "bold" }}>{item.number}</h3>
                <p style={{ fontSize: "18px", opacity: 0.9 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "42px", textAlign: "center", marginBottom: "15px" }}>What People Say</h2>
          <p style={{ textAlign: "center", fontSize: "18px", color: "#666", marginBottom: "60px" }}>Stories of hope and transformation</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{ backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: "40px", marginBottom: "15px" }}>"</div>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>{testimonial.text}</p>
                <div style={{ marginTop: "15px" }}>
                  <h4 style={{ margin: "0", fontSize: "18px" }}>{testimonial.name}</h4>
                  <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#e74c3c" }}>{testimonial.role}</p>
                  <div style={{ color: "#f39c12", marginTop: "8px" }}>{"★".repeat(testimonial.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "42px", textAlign: "center", marginBottom: "15px" }}>Get In Touch</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "50px", fontSize: "18px" }}>Have questions? We'd love to hear from you.</p>

          {status === "success" && <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>✅ Message sent successfully! We'll get back to you soon.</div>}
          {status === "error" && <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>❌ Failed to send. Please try again.</div>}
          {status === "sending" && <div style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>📧 Sending message...</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px" }} />
            </div>
            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Message *</label>
              <textarea rows="5" name="message" value={formData.message} onChange={handleChange} required style={{ width: "100%", padding: "14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px", fontFamily: "inherit" }}></textarea>
            </div>
            <button type="submit" disabled={status === "sending"} style={{ width: "100%", backgroundColor: "#e74c3c", color: "white", padding: "16px", border: "none", borderRadius: "50px", fontSize: "18px", fontWeight: "bold", cursor: "pointer", transition: "transform 0.3s" }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
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