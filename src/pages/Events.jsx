import { useState } from "react"
import axios from "axios"

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)
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

  const events = [
    {
      id: 1,
      title: "Annual Charity Run",
      date: "April 20, 2024",
      time: "7:00 AM - 10:00 AM",
      location: "Marina Beach, Chennai",
      description: "Join us for a 5K run to raise funds for education",
      image: "https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?w=600"
    },
    {
      id: 2,
      title: "Free Health Checkup Camp",
      date: "April 25, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Community Hall, Velachery",
      description: "Free medical consultation and medicines",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600"
    },
    {
      id: 3,
      title: "Education Awareness Workshop",
      date: "May 5, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Government School, Tambaram",
      description: "Workshop on importance of girl child education",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600"
    }
  ]

  const handleRegisterClick = (event) => {
    setSelectedEvent(event)
    setShowModal(true)
    setSubmitted(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      city: "",
      message: ""
    })
  }

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
          eventId: selectedEvent.id,
          eventTitle: selectedEvent.title,
          eventDate: selectedEvent.date,
          eventTime: selectedEvent.time,
          eventLocation: selectedEvent.location
        }
      )
      
      if (response.data.success) {
        setSubmitted(true)
        setTimeout(() => {
          setShowModal(false)
          setSubmitted(false)
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

  const closeModal = () => {
    setShowModal(false)
    setSubmitted(false)
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Upcoming Events</h1>
        <p style={{ fontSize: "18px" }}>Join us and make a difference</p>
      </div>

      {/* Events Grid */}
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {events.map(event => (
            <div key={event.id} style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <img src={event.image} alt={event.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>{event.title}</h3>
                <p>📅 {event.date}</p>
                <p>⏰ {event.time}</p>
                <p>📍 {event.location}</p>
                <p style={{ color: "#666", marginTop: "10px" }}>{event.description}</p>
                <button 
                  onClick={() => handleRegisterClick(event)}
                  style={{ 
                    marginTop: "15px", 
                    backgroundColor: "#e74c3c", 
                    color: "white", 
                    padding: "10px 20px", 
                    border: "none", 
                    borderRadius: "5px", 
                    cursor: "pointer",
                    transition: "background-color 0.3s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#c0392b"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#e74c3c"}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && selectedEvent && (
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
        }} onClick={closeModal}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            width: "500px",
            maxWidth: "90%",
            maxHeight: "90%",
            overflowY: "auto",
            position: "relative"
          }} onClick={(e) => e.stopPropagation()}>
            
            {!submitted ? (
              <>
                {/* Modal Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h2 style={{ color: "#e74c3c", margin: 0 }}>Register for Event</h2>
                  <button onClick={closeModal} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#666" }}>✕</button>
                </div>
                
                {/* Event Details */}
                <div style={{ backgroundColor: "#fef2f2", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                  <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>{selectedEvent.title}</p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>📅 {selectedEvent.date} | ⏰ {selectedEvent.time}</p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>📍 {selectedEvent.location}</p>
                </div>
                
                {/* Registration Form */}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px" }}
                  />
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px" }}
                  />
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px" }}
                  />
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px" }}
                    />
                    
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px" }}
                    />
                  </div>
                  
                  <textarea
                    name="message"
                    placeholder="Any specific requirements or questions?"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "12px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
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
                        flex: 1,
                        opacity: loading ? 0.7 : 1
                      }}
                    >
                      {loading ? "Registering..." : "Confirm Registration"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
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
              /* Success Message */
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
                <h3 style={{ color: "#27ae60", marginBottom: "10px" }}>Registration Successful!</h3>
                <p style={{ color: "#666", marginBottom: "5px" }}>Thank you for registering for {selectedEvent.title}.</p>
                <p style={{ color: "#666" }}>We will send you event details via email.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Events