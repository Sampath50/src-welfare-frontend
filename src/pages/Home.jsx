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
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAnimate(true)
    fetchContent()
    fetchTestimonials()
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
    }
  }

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/testimonials")
      const data = await response.json()
      if (data.success) {
        setTestimonials(data.testimonials)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
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

  if (loading) {
    return <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {/* Hero Section - Modern Design */}
      <div style={{
        height: "80vh",
        backgroundImage: "linear-gradient(135deg, rgba(37,99,235,0.9), rgba(59,130,246,0.7)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0px"
      }}>
        <div style={{ textAlign: "center", color: "white", padding: "20px", maxWidth: "800px" }}>
          <h1 style={{ 
            fontSize: "clamp(40px, 8vw, 70px)", 
            marginBottom: "20px", 
            fontWeight: "800",
            background: "linear-gradient(135deg, #ffffff, #bfdbfe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {content.hero.title}
          </h1>
          <p style={{ fontSize: "clamp(16px, 4vw, 20px)", marginBottom: "40px", opacity: 0.95, lineHeight: "1.6" }}>
            {content.hero.subtitle}
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/donate">
              <button style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "white",
                padding: "14px 40px",
                border: "none",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 15px rgba(37,99,235,0.4)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)"
                e.target.style.boxShadow = "0 8px 25px rgba(37,99,235,0.5)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 4px 15px rgba(37,99,235,0.4)"
              }}>
                Donate Now ❤️
              </button>
            </a>
            <a href="/programs">
              <button style={{
                background: "transparent",
                color: "white",
                padding: "14px 40px",
                border: "2px solid white",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white"
                e.target.style.color = "#2563eb"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent"
                e.target.style.color = "white"
              }}>
                Our Programs
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Statistics Section - Modern Cards */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 36px)", textAlign: "center", marginBottom: "15px", fontWeight: "700" }}>Our Impact in Numbers</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#64748b", marginBottom: "60px" }}>Making a real difference in communities</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ 
                background: "white",
                padding: "40px 20px",
                borderRadius: "20px",
                textAlign: "center",
                transition: "all 0.3s",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #e2e8f0"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)"
                e.currentTarget.style.boxShadow = "0 20px 25px -12px rgba(0,0,0,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)"
              }}>
                <h2 style={{ fontSize: "48px", color: "#2563eb", margin: "0", fontWeight: "800" }}>{stat.number}</h2>
                <h3 style={{ fontSize: "18px", margin: "10px 0", fontWeight: "600" }}>{stat.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 36px)", marginBottom: "20px", fontWeight: "700" }}>{content.mission.title}</h2>
          <p style={{ fontSize: "18px", color: "#64748b", maxWidth: "800px", margin: "0 auto 60px", lineHeight: "1.6" }}>
            {content.mission.text}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginTop: "40px" }}>
            <div style={{ padding: "30px", backgroundColor: "#f8fafc", borderRadius: "20px", transition: "transform 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎯</div>
              <h3 style={{ fontSize: "24px", marginBottom: "10px", fontWeight: "600" }}>Our Vision</h3>
              <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.6" }}>A world with equal opportunities for all</p>
            </div>
            <div style={{ padding: "30px", backgroundColor: "#f8fafc", borderRadius: "20px", transition: "transform 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>💪</div>
              <h3 style={{ fontSize: "24px", marginBottom: "10px", fontWeight: "600" }}>Our Impact</h3>
              <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.6" }}>Transforming lives through action</p>
            </div>
            <div style={{ padding: "30px", backgroundColor: "#f8fafc", borderRadius: "20px", transition: "transform 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>🤝</div>
              <h3 style={{ fontSize: "24px", marginBottom: "10px", fontWeight: "600" }}>Our Promise</h3>
              <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.6" }}>100% transparency in all activities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Impact Overview - Gradient Background */}
      <div style={{ padding: "60px 20px", background: "linear-gradient(135deg, #1e40af, #3b82f6)", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 36px)", marginBottom: "15px", fontWeight: "700" }}>Quick Impact Overview</h2>
          <p style={{ fontSize: "16px", marginBottom: "50px", opacity: 0.9 }}>Our reach across communities</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px" }}>
            {impactNumbers.map((item, index) => (
              <div key={index} style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "30px 20px",
                transition: "transform 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                <div style={{ fontSize: "50px", marginBottom: "15px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "36px", fontWeight: "bold", margin: "10px 0" }}>{item.number}</h3>
                <p style={{ fontSize: "14px", opacity: 0.9 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Dynamic from API */}
      <div style={{ padding: "60px 20px", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 36px)", textAlign: "center", marginBottom: "10px", fontWeight: "700" }}>What People Say</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#64748b", marginBottom: "50px" }}>Stories of hope and transformation</p>
          {testimonials.length === 0 ? (
            <p style={{ textAlign: "center", color: "#64748b" }}>No testimonials yet. Add them from Admin Panel.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} style={{ 
                  background: "white",
                  padding: "25px",
                  borderRadius: "20px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ fontSize: "30px", marginBottom: "10px", color: "#2563eb" }}>"</div>
                  <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#475569", marginBottom: "20px" }}>{testimonial.text}</p>
                  <div>
                    <h4 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{testimonial.name}</h4>
                    <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#2563eb" }}>{testimonial.role}</p>
                    <div style={{ color: "#fbbf24", marginTop: "8px", fontSize: "14px" }}>
                      {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Form Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 36px)", textAlign: "center", marginBottom: "15px", fontWeight: "700" }}>Get In Touch</h2>
          <p style={{ textAlign: "center", color: "#64748b", marginBottom: "50px", fontSize: "16px" }}>Have questions? We'd love to hear from you.</p>

          {status === "success" && <div style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "15px", borderRadius: "12px", marginBottom: "20px", textAlign: "center" }}>✅ Message sent successfully! We'll get back to you soon.</div>}
          {status === "error" && <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "15px", borderRadius: "12px", marginBottom: "20px", textAlign: "center" }}>❌ Failed to send. Please try again.</div>}
          {status === "sending" && <div style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "15px", borderRadius: "12px", marginBottom: "20px", textAlign: "center" }}>📧 Sending message...</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#1e293b" }}>Your Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "16px", transition: "border 0.3s" }} onFocus={(e) => e.target.style.borderColor = "#2563eb"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#1e293b" }}>Your Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "16px" }} />
            </div>
            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#1e293b" }}>Your Message *</label>
              <textarea rows="5" name="message" value={formData.message} onChange={handleChange} required style={{ width: "100%", padding: "14px", border: "1px solid #e2e8f0", borderRadius: "12px", fontSize: "16px", fontFamily: "inherit" }}></textarea>
            </div>
            <button type="submit" disabled={status === "sending"} style={{ width: "100%", background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "white", padding: "16px", border: "none", borderRadius: "50px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}>
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