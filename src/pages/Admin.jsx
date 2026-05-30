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
  const [searchTerm, setSearchTerm] = useState("")
  const [currentAdminPassword, setCurrentAdminPassword] = useState("admin123")
  
  // Content management states
  const [heroTitle, setHeroTitle] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [missionTitle, setMissionTitle] = useState("")
  const [missionText, setMissionText] = useState("")
  const [stats, setStats] = useState([])
  const [saveMessage, setSaveMessage] = useState("")
  
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
      loadContent()
    } else {
      alert("Wrong password!")
    }
  }

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const messagesRes = await fetch("https://src-welfare-backend.onrender.com/api/admin/messages")
      const volunteersRes = await fetch("https://src-welfare-backend.onrender.com/api/admin/volunteers")
      const galleryRes = await fetch("https://src-welfare-backend.onrender.com/api/admin/gallery")
      const donationsRes = await fetch("https://src-welfare-backend.onrender.com/api/admin/donations")
      
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

  const loadContent = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/content/home/all")
      const data = await response.json()
      if (data.success && data.contents) {
        for (let i = 0; i < data.contents.length; i++) {
          const item = data.contents[i]
          if (item.section === "hero") {
            setHeroTitle(item.data.title)
            setHeroSubtitle(item.data.subtitle)
          }
          if (item.section === "stats") {
            setStats(item.data)
          }
          if (item.section === "mission") {
            setMissionTitle(item.data.title)
            setMissionText(item.data.text)
          }
        }
      }
    } catch (error) {
      console.error("Error loading content:", error)
    }
  }

  const saveHeroContent = async () => {
    try {
      await fetch("https://src-welfare-backend.onrender.com/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "home",
          section: "hero",
          data: { title: heroTitle, subtitle: heroSubtitle }
        })
      })
      setSaveMessage("Hero section saved!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      alert("Error saving hero content")
    }
  }

  const saveMissionContent = async () => {
    try {
      await fetch("https://src-welfare-backend.onrender.com/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "home",
          section: "mission",
          data: { title: missionTitle, text: missionText }
        })
      })
      setSaveMessage("Mission section saved!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      alert("Error saving mission content")
    }
  }

  const saveStatsContent = async () => {
    try {
      await fetch("https://src-welfare-backend.onrender.com/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "home",
          section: "stats",
          data: stats
        })
      })
      setSaveMessage("Statistics saved!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      alert("Error saving statistics")
    }
  }

  const updateStat = (index, field, value) => {
    const newStats = [...stats]
    newStats[index][field] = value
    setStats(newStats)
  }

  const addStat = () => {
    setStats([...stats, { number: "100+", label: "New Stat" }])
  }

  const removeStat = (index) => {
    const newStats = stats.filter((_, i) => i !== index)
    setStats(newStats)
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
      const response = await axios.post("https://src-welfare-backend.onrender.com/api/upload/upload", formData)
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
      alert("Upload failed. Please try again.")
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

  const filteredMessages = messages.filter((msg) => {
    const name = msg.name || ""
    const email = msg.email || ""
    const term = searchTerm.toLowerCase()
    return name.toLowerCase().includes(term) || email.toLowerCase().includes(term)
  })

  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0)
  const pendingVolunteers = volunteers.filter((v) => v.status === "pending").length

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "15px", width: "350px" }}>
          <h2 style={{ textAlign: "center" }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" style={{ width: "100%", padding: "12px", margin: "20px 0", borderRadius: "8px", border: "1px solid #ccc" }} />
            <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Login</button>
          </form>
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px" }}>Password: admin123</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#1f2937", color: "white", padding: "20px 0" }}>
        <div style={{ padding: "0 20px 20px 20px", borderBottom: "1px solid #374151", marginBottom: "20px" }}>
          <h2>SRC Admin</h2>
        </div>
        
        <button onClick={() => setActiveTab("dashboard")} style={{ backgroundColor: activeTab === "dashboard" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", width: "100%" }}>Dashboard</button>
        <button onClick={() => setActiveTab("content")} style={{ backgroundColor: activeTab === "content" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", width: "100%" }}>📝 Content Manager</button>
        <button onClick={() => setActiveTab("gallery")} style={{ backgroundColor: activeTab === "gallery" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", width: "100%" }}>Gallery</button>
        <button onClick={() => setActiveTab("messages")} style={{ backgroundColor: activeTab === "messages" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", width: "100%" }}>Messages ({messages.length})</button>
        <button onClick={() => setActiveTab("volunteers")} style={{ backgroundColor: activeTab === "volunteers" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", width: "100%" }}>Volunteers ({volunteers.length})</button>
        <button onClick={() => setActiveTab("donations")} style={{ backgroundColor: activeTab === "donations" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", width: "100%" }}>Donations</button>
        
        <button onClick={() => setAuthenticated(false)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "12px 20px", textAlign: "left", cursor: "pointer", marginTop: "20px", width: "100%" }}>Logout</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        
        {saveMessage && (
          <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
            {saveMessage}
          </div>
        )}
        
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h2>Dashboard</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <h3>{messages.length}</h3>
                <p>Messages</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <h3>{volunteers.length}</h3>
                <p>Volunteers</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <h3>{pendingVolunteers}</h3>
                <p>Pending</p>
              </div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <h3>₹{totalDonations}</h3>
                <p>Donations</p>
              </div>
            </div>
          </div>
        )}

        {/* Content Manager */}
        {activeTab === "content" && (
          <div>
            <h2>Website Content Manager</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>Edit your homepage content. Changes will appear instantly.</p>
            
            {/* Hero Section */}
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Hero Section</h3>
              <div style={{ marginBottom: "10px" }}>
                <label>Main Title</label>
                <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} style={{ width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" }} />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Subtitle</label>
                <textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows="3" style={{ width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              </div>
              <button onClick={saveHeroContent} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Save Hero</button>
            </div>

            {/* Statistics Section */}
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Statistics Numbers</h3>
              {stats.map((stat, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <input type="text" value={stat.number} onChange={(e) => updateStat(index, "number", e.target.value)} placeholder="Number" style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <input type="text" value={stat.label} onChange={(e) => updateStat(index, "label", e.target.value)} placeholder="Label" style={{ flex: 2, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <button onClick={() => removeStat(index)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>X</button>
                </div>
              ))}
              <button onClick={addStat} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>+ Add Stat</button>
              <button onClick={saveStatsContent} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Save Stats</button>
            </div>

            {/* Mission Section */}
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Mission Section</h3>
              <div style={{ marginBottom: "10px" }}>
                <label>Mission Title</label>
                <input type="text" value={missionTitle} onChange={(e) => setMissionTitle(e.target.value)} style={{ width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" }} />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Mission Text</label>
                <textarea value={missionText} onChange={(e) => setMissionText(e.target.value)} rows="4" style={{ width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              </div>
              <button onClick={saveMissionContent} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Save Mission</button>
            </div>
          </div>
        )}

        {/* Gallery */}
        {activeTab === "gallery" && (
          <div>
            <h2>Gallery Management</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Upload New Image</h3>
              <form onSubmit={handleImageUpload}>
                <input type="text" placeholder="Image Title" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                <select value={imageCategory} onChange={(e) => setImageCategory(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                  <option>General</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Events</option>
                  <option>Volunteers</option>
                </select>
                <div style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center", borderRadius: "8px", marginBottom: "10px" }}>
                  <input type="file" accept="image/*" onChange={handleFileSelect} style={{ display: "none" }} id="imageUpload" />
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    {previewUrl ? <img src={previewUrl} alt="Preview" style={{ maxWidth: "200px" }} /> : "Click to select image"}
                  </label>
                </div>
                <button type="submit" disabled={uploading} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>{uploading ? "Uploading..." : "Upload Image"}</button>
              </form>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
              {gallery.map((img) => (
                <div key={img._id} style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden" }}>
                  <img src={img.imageUrl} alt={img.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                  <div style={{ padding: "10px" }}>
                    <h4>{img.title}</h4>
                    <button onClick={() => deleteGalleryImage(img._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "5px", cursor: "pointer", width: "100%" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div>
            <h2>Messages</h2>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "8px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", width: "200px" }} />
            {filteredMessages.map((msg) => (
              <div key={msg._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h4>{msg.name}</h4>
                    <p>{msg.email}</p>
                    <p>{msg.message}</p>
                    <small>{new Date(msg.createdAt).toLocaleString()}</small>
                  </div>
                  <button onClick={() => deleteMessage(msg._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Volunteers */}
        {activeTab === "volunteers" && (
          <div>
            <h2>Volunteers</h2>
            {volunteers.map((vol) => (
              <div key={vol._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h4>{vol.name}</h4>
                    <p>{vol.email} | {vol.phone}</p>
                    <p>Status: <strong>{vol.status}</strong></p>
                  </div>
                  <div>
                    {vol.status !== "approved" && <button onClick={() => updateVolunteerStatus(vol._id, "approved")} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Approve</button>}
                    {vol.status !== "rejected" && <button onClick={() => updateVolunteerStatus(vol._id, "rejected")} style={{ backgroundColor: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Reject</button>}
                    <button onClick={() => deleteVolunteer(vol._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Donations */}
        {activeTab === "donations" && (
          <div>
            <h2>Donations</h2>
            {donations.length === 0 ? (
              <p>No donations yet.</p>
            ) : (
              <div>
                <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
                  <h3>Total: ₹{totalDonations}</h3>
                  <p>From {donations.length} donors</p>
                </div>
                {donations.map((don) => (
                  <div key={don._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                    <h4>{don.name}</h4>
                    <p>{don.email}</p>
                    <p>₹{don.amount}</p>
                    <small>{new Date(don.createdAt).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin