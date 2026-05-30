import { useState } from "react"

function Volunteer() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", age: "", skills: "", availability: "", message: ""
  })
  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", phone: "", age: "", skills: "", availability: "", message: "" })
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

  const opportunities = [
    { title: "Teaching Assistant", description: "Help teach children in our education program", time: "Weekdays, 2-4 hours" },
    { title: "Medical Camp Support", description: "Assist doctors during health camps", time: "Weekends, flexible" },
    { title: "Event Coordinator", description: "Organize fundraising and awareness events", time: "Flexible hours" },
    { title: "Social Media Manager", description: "Manage our social media presence", time: "Remote, 5 hours/week" }
  ]

  return (
    <div>
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Become a Volunteer</h1>
        <p style={{ fontSize: "18px" }}>Join us in making a difference</p>
      </div>

      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px" }}>
          
          {/* Left Column - Opportunities */}
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Volunteer Opportunities</h2>
            {opportunities.map((opp, index) => (
              <div key={index} style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#e74c3c" }}>{opp.title}</h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>{opp.description}</p>
                <p style={{ marginTop: "10px", fontSize: "14px", color: "#999" }}>⏰ {opp.time}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Application Form */}
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Volunteer Application</h2>
            
            {status === "success" && <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>✅ Application submitted! We'll contact you soon.</div>}
            {status === "error" && <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>❌ Failed to submit. Please try again.</div>}
            {status === "sending" && <div style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "15px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>📧 Submitting...</div>}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} required style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <textarea name="skills" placeholder="Skills/Experience" value={formData.skills} onChange={handleChange} rows="3" style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }}></textarea>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <select name="availability" value={formData.availability} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }}>
                  <option value="">Select Availability</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Evenings</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <textarea name="message" placeholder="Why do you want to volunteer?" value={formData.message} onChange={handleChange} rows="3" style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }}></textarea>
              </div>
              <button type="submit" disabled={status === "sending"} style={{ width: "100%", backgroundColor: "#e74c3c", color: "white", padding: "14px", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}>
                {status === "sending" ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Volunteer