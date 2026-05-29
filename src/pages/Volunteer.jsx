import { useState } from "react"

function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    skills: "",
    availability: "",
    message: ""
  })
  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus("success")
    setTimeout(() => setStatus(""), 3000)
    setFormData({ name: "", email: "", phone: "", age: "", skills: "", availability: "", message: "" })
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          {/* Left Column - Opportunities */}
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Volunteer Opportunities</h2>
            <div style={{ display: "grid", gap: "20px" }}>
              {opportunities.map((opp, index) => (
                <div key={index} style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
                  <h3 style={{ margin: "0 0 10px 0", color: "#e74c3c" }}>{opp.title}</h3>
                  <p style={{ color: "#666", lineHeight: "1.6" }}>{opp.description}</p>
                  <p style={{ marginTop: "10px", fontSize: "14px", color: "#999" }}>⏰ {opp.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Volunteer Application</h2>
            {status === "success" && <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>✅ Application submitted! We'll contact you soon.</div>}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Phone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Skills/Experience</label>
                <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}></textarea>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Availability</label>
                <select name="availability" value={formData.availability} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
                  <option value="">Select...</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <button type="submit" style={{ width: "100%", backgroundColor: "#e74c3c", color: "white", padding: "12px", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer" }}>Submit Application</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Volunteer