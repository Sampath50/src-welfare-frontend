import { useState, useEffect } from "react"

function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")
  const [animate, setAnimate] = useState(false)
  
  // Default content - shows immediately (no loading)
  const [content, setContent] = useState({
    hero: { title: "SRC Welfare Trust", subtitle: "Together we can support education, healthcare, food drives, and social welfare programs." },
    stats: [{ number: "500+", label: "Families Helped" }, { number: "1200+", label: "Students Supported" }, { number: "50+", label: "Medical Camps" }, { number: "100+", label: "Volunteers" }],
    mission: { title: "Our Mission", text: "To empower underserved communities through education, healthcare, and social welfare programs." }
  })
  const [testimonials, setTestimonials] = useState([])
  const [contentLoaded, setContentLoaded] = useState(false)

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
    } finally {
      setContentLoaded(true)
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

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {/* Hero Section */}
      <div style={{
        height: "70vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.55)"
        }}></div>
        
        <div style={{ position: "relative", textAlign: "center", color: "white", padding: "20px", maxWidth: "800px", animation: animate ? "fadeInUp 0.6s ease-out" : "none" }}>
          <h1 style={{ fontSize: "52px", marginBottom: "20px", fontWeight: "700" }}>{content.hero.title}</h1>
          <p style={{ fontSize: "20px", marginBottom: "30px", lineHeight: "1.5", opacity: 0.95 }}>
            {content.hero.subtitle}
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/donate">
              <button style={{
                backgroundColor: "#dc2626",
                color: "white",
                padding: "12px 32px",
                border: "none",
                borderRadius: "40px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#b91c1c"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#dc2626"}>
                Donate Now
              </button>
            </a>
            <a href="/programs">
              <button style={{
                backgroundColor: "transparent",
                color: "white",
                padding: "12px 32px",
                border: "2px solid white",
                borderRadius: "40px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white"
                e.target.style.color = "#1f2937"
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

      {/* Statistics Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "15px", fontWeight: "700" }}>Our Impact in Numbers</h2>
          <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "50px" }}>Making a real difference in communities</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px" }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ 
                backgroundColor: "white", 
                padding: "30px 20px", 
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "transform 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <h2 style={{ fontSize: "44px", color: "#dc2626", margin: "0", fontWeight: "700" }}>{stat.number}</h2>
                <p style={{ fontSize: "16px", color: "#4b5563", marginTop: "10px" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px", fontWeight: "700" }}>{content.mission.title}</h2>
          <p style={{ fontSize: "18px", color: "#4b5563", maxWidth: "800px", margin: "0 auto 50px", lineHeight: "1.6" }}>
            {content.mission.text}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            <div style={{ padding: "25px", backgroundColor: "#f9fafb", borderRadius: "12px", transition: "transform 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: "45px", marginBottom: "15px" }}>🎯</div>
              <h3 style={{ fontSize: "22px", marginBottom: "10px", fontWeight: "600" }}>Our Vision</h3>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.5" }}>A world with equal opportunities for all</p>
            </div>
            <div style={{ padding: "25px", backgroundColor: "#f9fafb", borderRadius: "12px", transition: "transform 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: "45px", marginBottom: "15px" }}>💪</div>
              <h3 style={{ fontSize: "22px", marginBottom: "10px", fontWeight: "600" }}>Our Impact</h3>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.5" }}>Transforming lives through action</p>
            </div>
            <div style={{ padding: "25px", backgroundColor: "#f9fafb", borderRadius: "12px", transition: "transform 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: "45px", marginBottom: "15px" }}>🤝</div>
              <h3 style={{ fontSize: "22px", marginBottom: "10px", fontWeight: "600" }}>Our Promise</h3>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.5" }}>100% transparency in all activities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Impact Overview */}
      <div style={{ padding: "40px 20px", backgroundColor: "#dc2626", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: "700" }}>Quick Impact Overview</h2>
          <p style={{ fontSize: "14px", marginBottom: "30px", opacity: 0.9 }}>Our reach across communities</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px" }}>
            {impactNumbers.map((item, index) => (
              <div key={index}>
                <div style={{ fontSize: "32px", marginBottom: "5px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0" }}>{item.number}</h3>
                <p style={{ fontSize: "12px", opacity: 0.9 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: "60px 20px", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", textAlign: "center", marginBottom: "10px", fontWeight: "700" }}>What People Say</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#6b7280", marginBottom: "50px" }}>Stories of hope and transformation</p>
          {testimonials.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b7280" }}>No testimonials yet.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} style={{ 
                  backgroundColor: "white", 
                  padding: "25px", 
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ fontSize: "28px", marginBottom: "10px", color: "#dc2626" }}>"</div>
                  <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#4b5563", marginBottom: "20px" }}>{testimonial.text}</p>
                  <div>
                    <h4 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>{testimonial.name}</h4>
                    <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#dc2626" }}>{testimonial.role}</p>
                    <div style={{ color: "#fbbf24", marginTop: "8px" }}>
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
      <div style={{ padding: "60px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "15px", fontWeight: "700" }}>Get In Touch</h2>
          <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "40px" }}>Have questions? We'd love to hear from you.</p>

          {status === "success" && <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>✅ Message sent successfully!</div>}
          {status === "error" && <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>❌ Failed to send. Please try again.</div>}
          {status === "sending" && <div style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>📧 Sending...</div>}

          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={{ width: "100%", padding: "14px", marginBottom: "15px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "16px" }} 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={{ width: "100%", padding: "14px", marginBottom: "15px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "16px" }} 
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              style={{ width: "100%", padding: "14px", marginBottom: "15px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "16px", fontFamily: "inherit" }} 
            />
            <button 
              type="submit" 
              disabled={status === "sending"} 
              style={{ width: "100%", backgroundColor: "#dc2626", color: "white", padding: "14px", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "500", cursor: "pointer" }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#b91c1c"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#dc2626"}>
              {status === "sending" ? "Sending..." : "Send Message"}
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