import { useState } from "react"

function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")

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
        justifyContent: "center"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)"
        }}></div>
        
        <div style={{ position: "relative", textAlign: "center", color: "white", padding: "20px" }}>
          <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>SRC Welfare Trust</h1>
          <p style={{ fontSize: "22px", maxWidth: "700px", margin: "0 auto" }}>
            Together we can support education, healthcare, food drives, and social welfare programs.
          </p>
          <button style={{
            marginTop: "30px",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "15px 40px",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer"
          }}>
            Donate Now
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "#f3f4f6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px", textAlign: "center" }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "48px", color: "#2563eb", margin: "0 0 10px 0" }}>500+</h2>
            <p style={{ fontSize: "18px", margin: 0 }}>Families Helped</p>
          </div>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "48px", color: "#2563eb", margin: "0 0 10px 0" }}>1200+</h2>
            <p style={{ fontSize: "18px", margin: 0 }}>Students Supported</p>
          </div>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "48px", color: "#2563eb", margin: "0 0 10px 0" }}>50+</h2>
            <p style={{ fontSize: "18px", margin: 0 }}>Medical Camps</p>
          </div>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "48px", color: "#2563eb", margin: "0 0 10px 0" }}>100+</h2>
            <p style={{ fontSize: "18px", margin: 0 }}>Volunteers</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "48px", textAlign: "center", marginBottom: "10px" }}>Contact Us</h2>
          <p style={{ textAlign: "center", fontSize: "18px", color: "#6b7280", marginBottom: "50px" }}>
            Have questions? We'd love to hear from you.
          </p>

          {status === "success" && (
            <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
              ✅ Message sent successfully!
            </div>
          )}
          {status === "error" && (
            <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
              ❌ Failed to send. Please try again.
            </div>
          )}
          {status === "sending" && (
            <div style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
              📧 Sending message...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", fontSize: "16px" }}>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "15px", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "16px" }}
                placeholder="Enter your name"
              />
            </div>
            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", fontSize: "16px" }}>Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "15px", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "16px" }}
                placeholder="your@email.com"
              />
            </div>
            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", fontSize: "16px" }}>Your Message</label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "15px", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "16px", fontFamily: "inherit" }}
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home