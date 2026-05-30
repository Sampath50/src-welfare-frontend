import { useState, useEffect } from "react"

function Admin() {
  const [activeTab, setActiveTab] = useState("messages")
  const [messages, setMessages] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [gallery, setGallery] = useState([])
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  
  // New gallery form
  const [newImage, setNewImage] = useState({ title: "", imageUrl: "", category: "General" })

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === "admin123") {
      setAuthenticated(true)
      fetchAllData()
    } else {
      alert("Wrong password!")
    }
  }

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [messagesRes, volunteersRes, galleryRes, donationsRes] = await Promise.all([
        fetch("https://src-welfare-backend.onrender.com/api/admin/messages"),
        fetch("https://src-welfare-backend.onrender.com/api/admin/volunteers"),
        fetch("https://src-welfare-backend.onrender.com/api/admin/gallery"),
        fetch("https://src-welfare-backend.onrender.com/api/admin/donations")
      ])
      
      const messagesData = await messagesRes.json()
      const volunteersData = await volunteersRes.json()
      const galleryData = await galleryRes.json()
      const donationsData = await donationsRes.json()
      
      if (messagesData.success) setMessages(messagesData.messages)
      if (volunteersData.success) setVolunteers(volunteersData.volunteers)
      if (galleryData.success) setGallery(galleryData.images)
      if (donationsData.success) setDonations(donationsData.donations)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id) => {
    if (window.confirm("Delete this message?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/messages/${id}`, { method: "DELETE" })
      fetchAllData()
    }
  }

  const updateVolunteerStatus = async (id, status) => {
    await fetch(`https://src-welfare-backend.onrender.com/api/admin/volunteers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
    fetchAllData()
  }

  const deleteVolunteer = async (id) => {
    if (window.confirm("Delete this volunteer application?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/volunteers/${id}`, { method: "DELETE" })
      fetchAllData()
    }
  }

  const addGalleryImage = async (e) => {
    e.preventDefault()
    if (!newImage.title || !newImage.imageUrl) {
      alert("Please fill title and image URL")
      return
    }
    await fetch("https://src-welfare-backend.onrender.com/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newImage)
    })
    setNewImage({ title: "", imageUrl: "", category: "General" })
    fetchAllData()
  }

  const deleteGalleryImage = async (id) => {
    if (window.confirm("Delete this image?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/gallery/${id}`, { method: "DELETE" })
      fetchAllData()
    }
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "15px", width: "350px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{ width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              Login
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px" }}>Password: admin123</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      {/* Admin Navbar */}
      <div style={{ backgroundColor: "#1f2937", color: "white", padding: "15px 20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <button onClick={() => setActiveTab("messages")} style={{ backgroundColor: activeTab === "messages" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>📧 Messages ({messages.length})</button>
        <button onClick={() => setActiveTab("volunteers")} style={{ backgroundColor: activeTab === "volunteers" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>🤝 Volunteers ({volunteers.length})</button>
        <button onClick={() => setActiveTab("gallery")} style={{ backgroundColor: activeTab === "gallery" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>🖼️ Gallery ({gallery.length})</button>
        <button onClick={() => setActiveTab("donations")} style={{ backgroundColor: activeTab === "donations" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>💰 Donations ({donations.reduce((sum, d) => sum + d.amount, 0)} ₹)</button>
        <button onClick={() => setAuthenticated(false)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", marginLeft: "auto" }}>Logout</button>
      </div>

      <div style={{ padding: "30px 20px", maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div>
            <h2>Contact Messages</h2>
            {loading ? <p>Loading...</p> : messages.length === 0 ? <p>No messages yet.</p> : (
              messages.map(msg => (
                <div key={msg._id} style={{ backgroundColor: "white", padding: "20px", marginBottom: "20px", borderRadius: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <h3>{msg.name}</h3>
                      <p>📧 {msg.email}</p>
                      <p>{msg.message}</p>
                      <p style={{ fontSize: "12px", color: "#999" }}>{new Date(msg.createdAt).toLocaleString()}</p>
                    </div>
                    <button onClick={() => deleteMessage(msg._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Volunteers Tab */}
        {activeTab === "volunteers" && (
          <div>
            <h2>Volunteer Applications</h2>
            {loading ? <p>Loading...</p> : volunteers.length === 0 ? <p>No volunteer applications yet.</p> : (
              volunteers.map(vol => (
                <div key={vol._id} style={{ backgroundColor: "white", padding: "20px", marginBottom: "20px", borderRadius: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <div>
                      <h3>{vol.name}</h3>
                      <p>📧 {vol.email}</p>
                      <p>📞 {vol.phone}</p>
                      {vol.age && <p>Age: {vol.age}</p>}
                      {vol.skills && <p>Skills: {vol.skills}</p>}
                      {vol.availability && <p>Availability: {vol.availability}</p>}
                      {vol.message && <p>Message: {vol.message}</p>}
                      <p style={{ fontSize: "12px", color: "#999" }}>Applied: {new Date(vol.createdAt).toLocaleString()}</p>
                      <p>Status: <strong style={{ color: vol.status === "approved" ? "green" : vol.status === "rejected" ? "red" : "orange" }}>{vol.status}</strong></p>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "start" }}>
                      {vol.status !== "approved" && <button onClick={() => updateVolunteerStatus(vol._id, "approved")} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Approve</button>}
                      {vol.status !== "rejected" && <button onClick={() => updateVolunteerStatus(vol._id, "rejected")} style={{ backgroundColor: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Reject</button>}
                      <button onClick={() => deleteVolunteer(vol._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div>
            <h2>Gallery Management</h2>
            
            {/* Add Image Form */}
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
              <h3>Add New Image</h3>
              <form onSubmit={addGalleryImage} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input type="text" placeholder="Image Title" value={newImage.title} onChange={(e) => setNewImage({ ...newImage, title: e.target.value })} style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                <input type="text" placeholder="Image URL" value={newImage.imageUrl} onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })} style={{ flex: 2, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                <select value={newImage.category} onChange={(e) => setNewImage({ ...newImage, category: e.target.value })} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                  <option>General</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Events</option>
                  <option>Volunteers</option>
                </select>
                <button type="submit" style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Add Image</button>
              </form>
            </div>

            {/* Gallery Grid */}
            {loading ? <p>Loading...</p> : gallery.length === 0 ? <p>No images in gallery.</p> : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                {gallery.map(img => (
                  <div key={img._id} style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <img src={img.imageUrl} alt={img.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <div style={{ padding: "15px" }}>
                      <h4>{img.title}</h4>
                      <p style={{ fontSize: "12px", color: "#666" }}>{img.category}</p>
                      <button onClick={() => deleteGalleryImage(img._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer", width: "100%" }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === "donations" && (
          <div>
            <h2>Donations</h2>
            {loading ? <p>Loading...</p> : donations.length === 0 ? <p>No donations yet.</p> : (
              <>
                <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
                  <h3>Total Donations: ₹{donations.reduce((sum, d) => sum + d.amount, 0)}</h3>
                  <p>From {donations.length} donors</p>
                </div>
                {donations.map(don => (
                  <div key={don._id} style={{ backgroundColor: "white", padding: "20px", marginBottom: "20px", borderRadius: "10px" }}>
                    <div>
                      <h3>{don.name}</h3>
                      <p>📧 {don.email}</p>
                      <p>💰 Amount: ₹{don.amount}</p>
                      <p>🆔 Payment ID: {don.paymentId || "N/A"}</p>
                      <p style={{ fontSize: "12px", color: "#999" }}>{new Date(don.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin