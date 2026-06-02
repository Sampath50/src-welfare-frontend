import { useState } from "react"
import axios from "axios"

function EventRegistrationModal({ event, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await axios.post(
        "https://src-welfare-backend.onrender.com/api/events/register",
        {
          ...formData,
          eventId: event._id,
          eventTitle: event.title,
          eventDate: event.date
        }
      )
      
      if (response.data.success) {
        setSubmitted(true)
        if (onSuccess) onSuccess()
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        alert("Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }} onClick={onClose}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        width: "500px",
        maxWidth: "90%",
        maxHeight: "90%",
        overflowY: "auto"
      }} onClick={(e) => e.stopPropagation()}>
        
        {!submitted ? (
          <>
            <h2 style={{ color: "#e74c3c", marginBottom: "10px" }}>Register for Event</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              <strong>{event.title}</strong><br />
              📅 {event.date} | 📍 {event.location}
            </p>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                required
                value={formData.name}
                onChange={handleChange}
                style={{ width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "8px" }}
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "8px" }}
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                required
                value={formData.phone}
                onChange={handleChange}
                style={{ width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "8px" }}
              />
              
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                style={{ width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "8px" }}
              />
              
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                style={{ width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "8px" }}
              />
              
              <textarea
                name="message"
                placeholder="Any specific requirements or questions?"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                style={{ width: "100%", padding: "12px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
              ></textarea>
              
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    flex: 1
                  }}
                >
                  {loading ? "Registering..." : "Confirm Registration"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    backgroundColor: "#666",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
            <h3 style={{ color: "#27ae60" }}>Registration Successful!</h3>
            <p style={{ marginTop: "15px", color: "#666" }}>
              Thank you for registering. We will send you event details via email.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventRegistrationModal