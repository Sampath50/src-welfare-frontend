import { useState } from "react"

function ContactUs() {
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
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Contact Us</h1>
        <p style={{ fontSize: "18px" }}>Get in touch with us</p>
      </div>
      
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "50px" }}>
          
          {/* Left Column - Contact Info */}
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "20px", color: "#e74c3c" }}>Get in Touch</h2>
            
            {/* Address */}
            <div style={{ display: "flex", gap: "15px", marginBottom: "25px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "24px" }}>📍</div>
              <div>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>Address</h3>
                <p style={{ margin: 0, color: "#666", lineHeight: "1.5" }}>
                  D.No.1-1-27/2 Plot No-2 3rd floor<br />
                  Kapra, Hyderabad, Telangana - 500062
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", gap: "15px", marginBottom: "25px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "24px" }}>📞</div>
              <div>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>Phone</h3>
                <p style={{ margin: 0, color: "#666" }}>
                  +91 8284898542
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", gap: "15px", marginBottom: "25px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "24px" }}>📧</div>
              <div>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>Email</h3>
                <p style={{ margin: 0, color: "#666" }}>
                  info@srccharity.org
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div style={{ display: "flex", gap: "15px", marginBottom: "25px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "24px" }}>⏰</div>
              <div>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>Office Hours</h3>
                <p style={{ margin: 0, color: "#666" }}>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div style={{ marginTop: "30px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "15px" }}>Follow Us</h3>
              <div style={{ display: "flex", gap: "15px" }}>
                <a href="#" target="_blank" style={{ 
                  backgroundColor: "#1f2937", 
                  color: "white", 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: "20px"
                }}>📘</a>
                <a href="#" target="_blank" style={{ 
                  backgroundColor: "#1f2937", 
                  color: "white", 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: "20px"
                }}>🐦</a>
                <a href="#" target="_blank" style={{ 
                  backgroundColor: "#1f2937", 
                  color: "white", 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: "20px"
                }}>📷</a>
                <a href="#" target="_blank" style={{ 
                  backgroundColor: "#1f2937", 
                  color: "white", 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: "20px"
                }}>🔗</a>
              </div>
            </div>
          </div>

          {/* Right Column - Map & Quick Contact */}
          <div>
            {/* Map */}
            <div style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "28px", marginBottom: "20px", color: "#e74c3c" }}>Our Location</h2>
              <div style={{ 
                backgroundColor: "#f3f4f6", 
                borderRadius: "10px", 
                overflow: "hidden",
                height: "250px"
              }}>
                <iframe
                  title="SRC Welfare Trust Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5!2d78.5!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzAwLjAiTiA3OMKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div>
              <h2 style={{ fontSize: "28px", marginBottom: "20px", color: "#e74c3c" }}>Quick Contact</h2>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{ fontSize: "30px" }}>📧</div>
                  <div>
                    <h4 style={{ margin: "0 0 5px 0" }}>Email Us Directly</h4>
                    <p style={{ margin: 0, color: "#e74c3c" }}>care@srccharity.org</p>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{ fontSize: "30px" }}>💬</div>
                  <div>
                    <h4 style={{ margin: "0 0 5px 0" }}>WhatsApp Us</h4>
                    <p style={{ margin: 0, color: "#e74c3c" }}>+91 8184898542</p>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{ fontSize: "30px" }}>📝</div>
                  <div>
                    <h4 style={{ margin: "0 0 5px 0" }}>Contact Form</h4>
                    <p style={{ margin: 0, color: "#666" }}>Use the form on our homepage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div style={{ marginTop: "60px", backgroundColor: "#f8f9fa", padding: "40px", borderRadius: "15px" }}>
          <h2 style={{ fontSize: "32px", textAlign: "center", marginBottom: "10px", color: "#e74c3c" }}>Send Us a Message</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>We'd love to hear from you. Fill out the form below.</p>

          {status === "success" && <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>✅ Message sent successfully! We'll get back to you soon.</div>}
          {status === "error" && <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>❌ Failed to send. Please try again.</div>}
          {status === "sending" && <div style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>📧 Sending message...</div>}

          <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "16px" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "16px" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Your Message</label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "16px", fontFamily: "inherit" }}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                width: "100%",
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "14px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
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

export default ContactUs
