import { useState, useEffect } from "react"
import axios from "axios"

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [messages, setMessages] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [gallery, setGallery] = useState([])
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentAdminPassword, setCurrentAdminPassword] = useState("admin123")
  
  // Image upload states
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [imageTitle, setImageTitle] = useState("")
  const [imageCategory, setImageCategory] = useState("General")
  const [uploading, setUploading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === currentAdminPassword) {
      setAuthenticated(true)
      fetchAllData()
    } else {
      alert("Wrong password!")
    }
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match!")
      return
    }
    if (newPassword.length < 4) {
      setPasswordMessage("Password must be at least 4 characters!")
      return
    }
    setCurrentAdminPassword(newPassword)
    setPasswordMessage("Password changed successfully!")
    setTimeout(() => {
      setShowChangePassword(false)
      setPasswordMessage("")
    }, 3000)
    setNewPassword("")
    setConfirmPassword("")
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
      
      if (messagesData.success) setMessages(messagesData.messages || [])
      if (volunteersData.success) setVolunteers(volunteersData.volunteers || [])
      if (galleryData.success) setGallery(galleryData.images || [])
      if (donationsData.success) setDonations(donationsData.donations || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile || !imageTitle) {
      alert("Please select an image and enter a title")
      return
    }
    
    setUploading(true)
    const formData = new FormData()
    formData.append("image", selectedFile)
    formData.append("title", imageTitle)
    formData.append("category", imageCategory)
    
    try {
      const response = await axios.post("https://src-welfare-backend.onrender.com/api/upload/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      if (response.data.success) {
        alert("Image uploaded successfully!")
        setSelectedFile(null)
        setPreviewUrl(null)
        setImageTitle("")
        fetchAllData()
      } else {
        alert("Upload failed: " + response.data.message)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Check console for details.")
    } finally {
      setUploading(false)
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
    if (window.confirm("Delete this volunteer?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/volunteers/${id}`, { method: "DELETE" })
      fetchAllData()
    }
  }

  const deleteGalleryImage = async (id) => {
    if (window.confirm("Delete this image?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/gallery/${id}`, { method: "DELETE" })
      fetchAllData()
    }
  }

  const filteredMessages = messages.filter(msg => 
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0)
  const pendingVolunteers = volunteers.filter(v => v.status === "pending").length

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "15px", width: "350px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Admin Login</h2>
          <p style={{ textAlign: "center", fontSize: "12px", color: "#666", marginBottom: "20px" }}>SRC Welfare Trust</p>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" style={{ width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Login</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* Sidebar */}
      <div style={{ width: "260px", backgroundColor: "#1f2937", color: "white", padding: "20px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 20px 20px", borderBottom: "1px solid #374151", marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>SRC Admin</h2>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>Website Management</p>
        </div>
        
        <button onClick={() => setActiveTab("dashboard")} style={{ backgroundColor: activeTab === "dashboard" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", margin: "2px 10px", borderRadius: "8px" }}>📊 Dashboard</button>
        <button onClick={() => setActiveTab("gallery")} style={{ backgroundColor: activeTab === "gallery" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", margin: "2px 10px", borderRadius: "8px" }}>🖼️ Gallery Management</button>
        <button onClick={() => setActiveTab("messages")} style={{ backgroundColor: activeTab === "messages" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", margin: "2px 10px", borderRadius: "8px" }}>📧 Messages ({messages.length})</button>
        <button onClick={() => setActiveTab("volunteers")} style={{ backgroundColor: activeTab === "volunteers" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", margin: "2px 10px", borderRadius: "8px" }}>🤝 Volunteers ({volunteers.length})</button>
        <button onClick={() => setActiveTab("donations")} style={{ backgroundColor: activeTab === "donations" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", margin: "2px 10px", borderRadius: "8px" }}>💰 Donations</button>
        
        <div style={{ flex: 1 }}></div>
        
        <button onClick={() => setShowChangePassword(!showChangePassword)} style={{ backgroundColor: "#f59e0b", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", margin: "5px 10px", borderRadius: "8px" }}>🔐 Change Password</button>
        <button onClick={() => setAuthenticated(false)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", margin: "10px", borderRadius: "8px" }}>🚪 Logout</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px", overflowX: "auto" }}>
        
        {showChangePassword && (
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "30px", border: "2px solid #e74c3c" }}>
            <h3>Change Admin Password</h3>
            <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px" }}>
              <input type="password" placeholder="New Password (min 4 characters)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              {passwordMessage && <p style={{ color: "green" }}>{passwordMessage}</p>}
              <button type="submit" style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Save Password</button>
            </form>
          </div>
        )}
        
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h2>Dashboard Overview</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "30px" }}>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <div style={{ fontSize: "40px" }}>📧</div>
                <h3>{messages.length}</h3>
                <p>Messages</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <div style={{ fontSize: "40px" }}>🤝</div>
                <h3>{volunteers.length}</h3>
                <p>Volunteers</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <div style={{ fontSize: "40px" }}>⏳</div>
                <h3>{pendingVolunteers}</h3>
                <p>Pending</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <div style={{ fontSize: "40px" }}>💰</div>
                <h3>₹{totalDonations}</h3>
                <p>Donations</p>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Management */}
        {activeTab === "gallery" && (
          <div>
            <h2>Gallery Management</h2>
            
            {/* Upload Form */}
            <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "12px", marginBottom: "30px" }}>
              <h3>Upload New Image</h3>
              <form onSubmit={handleImageUpload} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input type="text" placeholder="Image Title" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} required style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }} />
                
                <select value={imageCategory} onChange={(e) => setImageCategory(e.target.value)} style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}>
                  <option>General</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Events</option>
                  <option>Volunteers</option>
                </select>
                
                <div style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center", borderRadius: "8px", cursor: "pointer" }}>
                  <input type="file" accept="image/*" onChange={handleFileSelect} style={{ display: "none" }} id="imageUpload" />
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }} />
                    ) : (
                      <div style={{ padding: "40px" }}>Click here to select image from your computer</div>
                    )}
                  </label>
                </div>
                
                <button type="submit" disabled={uploading} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "12px", borderRadius: "8px", cursor: "pointer" }}>
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              </form>
            </div>

            {/* Gallery Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
              {gallery.map(img => (
                <div key={img._id} style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                  <img src={img.imageUrl} alt={img.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                  <div style={{ padding: "10px" }}>
                    <h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>{img.title}</h4>
                    <p style={{ fontSize: "11px", color: "#666", margin: "0 0 10px 0" }}>{img.category}</p>
                    <button onClick={() => deleteGalleryImage(img._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "6px", borderRadius: "5px", cursor: "pointer", width: "100%" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
              <h2>Contact Messages</h2>
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "5px", width: "200px" }} />
            </div>
            {filteredMessages.map(msg => (
              <div key={msg._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h4>{msg.name}</h4>
                    <p>Email: {msg.email}</p>
                    <p>{msg.message}</p>
                    <small>{new Date(msg.createdAt).toLocaleString()}</small>
                  </div>
                  <button onClick={() => deleteMessage(msg._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Volunteers Tab */}
        {activeTab === "volunteers" && (
          <div>
            <h2>Volunteer Applications</h2>
            {volunteers.map(vol => (
              <div key={vol._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div>
                    <h4>{vol.name}</h4>
                    <p>Email: {vol.email} | Phone: {vol.phone}</p>
                    <p>Status: <strong style={{ color: vol.status === "approved" ? "green" : vol.status === "rejected" ? "red" : "orange" }}>{vol.status}</strong></p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {vol.status !== "approved" && <button onClick={() => updateVolunteerStatus(vol._id, "approved")} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Approve</button>}
                    {vol.status !== "rejected" && <button onClick={() => updateVolunteerStatus(vol._id, "rejected")} style={{ backgroundColor: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Reject</button>}
                    <button onClick={() => deleteVolunteer(vol._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === "donations" && (
          <div>
            <h2>Donations</h2>
            {donations.length === 0 ? <p>No donations yet.</p> : (
              <>
                <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
                  <h3>Total: ₹{totalDonations}</h3>
                  <p>From {donations.length} donors</p>
                </div>
                {donations.map(don => (
                  <div key={don._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                    <h4>{don.name}</h4>
                    <p>Email: {don.email}</p>
                    <p>Amount: ₹{don.amount}</p>
                    <small>{new Date(don.createdAt).toLocaleString()}</small>
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