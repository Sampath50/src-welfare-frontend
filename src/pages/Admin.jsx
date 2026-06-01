import { useState, useEffect } from "react"
import axios from "axios"

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [messages, setMessages] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [gallery, setGallery] = useState([])
  const [donations, setDonations] = useState([])
  const [team, setTeam] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [events, setEvents] = useState([])
  const [blogs, setBlogs] = useState([])
  const [socialLinks, setSocialLinks] = useState([])
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentAdminPassword, setCurrentAdminPassword] = useState("admin123")
  
  // Edit modal states
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  
  // Testimonial edit states
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [editTestimonialModal, setEditTestimonialModal] = useState(false)
  const [editTestimonialData, setEditTestimonialData] = useState({ name: "", role: "", text: "", rating: 5, imageUrl: "" })
  
  // Form states
  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", text: "", rating: 5, imageUrl: "" })
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "", time: "", location: "", imageUrl: "", category: "General" })
  const [newBlog, setNewBlog] = useState({ title: "", excerpt: "", content: "", category: "", author: "Admin", imageUrl: "", readTime: "3 min read" })
  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "", icon: "", order: 0 })
  
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
  
  // Team image upload states
  const [teamImageFile, setTeamImageFile] = useState(null)
  const [teamImagePreview, setTeamImagePreview] = useState(null)
  const [teamUploading, setTeamUploading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === "admin" && password === currentAdminPassword) {
      setAuthenticated(true)
      fetchAllData()
      loadContent()
      fetchTeam()
      fetchTestimonials()
      fetchEvents()
      fetchBlogs()
      fetchSocialLinks()
      fetchReport()
    } else {
      alert("Wrong username or password!")
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

  const fetchTeam = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/team")
      const data = await response.json()
      if (data.success) setTeam(data.team)
    } catch (error) {
      console.error("Error fetching team:", error)
    }
  }

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/testimonials")
      const data = await response.json()
      if (data.success) setTestimonials(data.testimonials)
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/events")
      const data = await response.json()
      if (data.success) setEvents(data.events)
    } catch (error) {
      console.error("Error fetching events:", error)
    }
  }

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/blogs")
      const data = await response.json()
      if (data.success) setBlogs(data.blogs)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    }
  }

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/social-links")
      const data = await response.json()
      if (data.success) setSocialLinks(data.socialLinks)
    } catch (error) {
      console.error("Error fetching social links:", error)
    }
  }

  const fetchReport = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/donation-report")
      const data = await response.json()
      if (data.success) setReportData(data.report)
    } catch (error) {
      console.error("Error fetching report:", error)
    }
  }

  // Testimonial CRUD
  const addTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.text) {
      alert("Name, Role and Testimonial text are required!")
      return
    }
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial)
      })
      const data = await response.json()
      if (data.success) {
        alert("Testimonial added!")
        setNewTestimonial({ name: "", role: "", text: "", rating: 5, imageUrl: "" })
        fetchTestimonials()
      }
    } catch (error) {
      alert("Error adding testimonial")
    }
  }

  const deleteTestimonial = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/testimonials/${id}`, { method: "DELETE" })
      fetchTestimonials()
    }
  }

  const openEditTestimonialModal = (testimonial) => {
    setEditingTestimonial(testimonial)
    setEditTestimonialData({
      name: testimonial.name,
      role: testimonial.role,
      text: testimonial.text,
      rating: testimonial.rating,
      imageUrl: testimonial.imageUrl || ""
    })
    setEditTestimonialModal(true)
  }

  const updateTestimonial = async () => {
    if (!editTestimonialData.name || !editTestimonialData.role || !editTestimonialData.text) {
      alert("Name, Role and Testimonial text are required!")
      return
    }
    try {
      const response = await fetch(`https://src-welfare-backend.onrender.com/api/admin/testimonials/${editingTestimonial._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTestimonialData)
      })
      const data = await response.json()
      if (data.success) {
        alert("Testimonial updated!")
        setEditTestimonialModal(false)
        fetchTestimonials()
      }
    } catch (error) {
      alert("Error updating testimonial")
    }
  }

  // Event CRUD
  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date) {
      alert("Title and Date are required!")
      return
    }
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      })
      const data = await response.json()
      if (data.success) {
        alert("Event added!")
        setNewEvent({ title: "", description: "", date: "", time: "", location: "", imageUrl: "", category: "General" })
        fetchEvents()
      }
    } catch (error) {
      alert("Error adding event")
    }
  }

  const deleteEvent = async (id) => {
    if (window.confirm("Delete this event?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/events/${id}`, { method: "DELETE" })
      fetchEvents()
    }
  }

  // Blog CRUD
  const addBlog = async () => {
    if (!newBlog.title || !newBlog.excerpt || !newBlog.content || !newBlog.category) {
      alert("Title, Excerpt, Content and Category are required!")
      return
    }
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog)
      })
      const data = await response.json()
      if (data.success) {
        alert("Blog added!")
        setNewBlog({ title: "", excerpt: "", content: "", category: "", author: "Admin", imageUrl: "", readTime: "3 min read" })
        fetchBlogs()
      }
    } catch (error) {
      alert("Error adding blog")
    }
  }

  const deleteBlog = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/blogs/${id}`, { method: "DELETE" })
      fetchBlogs()
    }
  }

  // Social Link CRUD
  const addSocialLink = async () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      alert("Platform and URL are required!")
      return
    }
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/social-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSocialLink)
      })
      const data = await response.json()
      if (data.success) {
        alert("Social link added!")
        setNewSocialLink({ platform: "", url: "", icon: "", order: 0 })
        fetchSocialLinks()
      }
    } catch (error) {
      alert("Error adding social link")
    }
  }

  const deleteSocialLink = async (id) => {
    if (window.confirm("Delete this social link?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/social-links/${id}`, { method: "DELETE" })
      fetchSocialLinks()
    }
  }

  // Export Data
  const exportData = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/export-all")
      const data = await response.json()
      if (data.success) {
        const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `src-welfare-backup-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
        alert("Data exported successfully!")
      }
    } catch (error) {
      alert("Error exporting data")
    }
  }

  const exportToCSV = (data, filename) => {
    if (!data.length) return
    const headers = Object.keys(data[0])
    const csv = [headers.join(','), ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const uploadTeamImage = async () => {
    if (!teamImageFile) return null
    setTeamUploading(true)
    const formData = new FormData()
    formData.append("image", teamImageFile)
    try {
      const response = await axios.post("https://src-welfare-backend.onrender.com/api/upload/upload", formData)
      return response.data.url
    } catch (error) {
      console.error("Upload error:", error)
      return null
    } finally {
      setTeamUploading(false)
    }
  }

  const addTeamMember = async () => {
    const name = document.getElementById("teamName")?.value
    const role = document.getElementById("teamRole")?.value
    const bio = document.getElementById("teamBio")?.value
    const email = document.getElementById("teamEmail")?.value
    const phone = document.getElementById("teamPhone")?.value
    const order = parseInt(document.getElementById("teamOrder")?.value) || 0
    
    if (!name || !role) {
      alert("Name and Role are required!")
      return
    }
    
    let imageUrl = document.getElementById("teamImage")?.value || ""
    if (teamImageFile) {
      const uploadedUrl = await uploadTeamImage()
      if (uploadedUrl) imageUrl = uploadedUrl
    }
    
    const newMember = { name, role, bio, imageUrl, email, phone, order }
    
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember)
      })
      const data = await response.json()
      if (data.success) {
        alert("Team member added!")
        if (document.getElementById("teamName")) document.getElementById("teamName").value = ""
        if (document.getElementById("teamRole")) document.getElementById("teamRole").value = ""
        if (document.getElementById("teamBio")) document.getElementById("teamBio").value = ""
        if (document.getElementById("teamImage")) document.getElementById("teamImage").value = ""
        if (document.getElementById("teamEmail")) document.getElementById("teamEmail").value = ""
        if (document.getElementById("teamPhone")) document.getElementById("teamPhone").value = ""
        if (document.getElementById("teamOrder")) document.getElementById("teamOrder").value = "0"
        setTeamImageFile(null)
        setTeamImagePreview(null)
        fetchTeam()
      }
    } catch (error) {
      alert("Error adding team member")
    }
  }

  const deleteTeamMember = async (id) => {
    if (window.confirm("Delete this team member?")) {
      await fetch(`https://src-welfare-backend.onrender.com/api/admin/team/${id}`, { method: "DELETE" })
      fetchTeam()
    }
  }

  const openEditModal = (member) => {
    setEditingMember(member)
    setEditModalOpen(true)
  }

  const updateTeamMember = async () => {
    const updatedMember = {
      name: document.getElementById("editName")?.value,
      role: document.getElementById("editRole")?.value,
      bio: document.getElementById("editBio")?.value,
      imageUrl: document.getElementById("editImage")?.value,
      email: document.getElementById("editEmail")?.value,
      phone: document.getElementById("editPhone")?.value,
      order: parseInt(document.getElementById("editOrder")?.value) || 0
    }
    
    if (!updatedMember.name || !updatedMember.role) {
      alert("Name and Role are required!")
      return
    }
    
    try {
      const response = await fetch(`https://src-welfare-backend.onrender.com/api/admin/team/${editingMember._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMember)
      })
      const data = await response.json()
      if (data.success) {
        alert("Team member updated!")
        setEditModalOpen(false)
        fetchTeam()
      }
    } catch (error) {
      alert("Error updating team member")
    }
  }

  const handleTeamImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setTeamImageFile(file)
      setTeamImagePreview(URL.createObjectURL(file))
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
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Admin Login</h2>
          <p style={{ textAlign: "center", fontSize: "12px", color: "#666", marginBottom: "20px" }}>SRC Welfare Trust</p>
          <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Login</button>
          </form>
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#666" }}>Username: admin | Password: admin123</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* Sidebar */}
      <div style={{ width: "280px", backgroundColor: "#1f2937", color: "white", padding: "25px 0", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>
        <div style={{ padding: "0 20px 25px 20px", borderBottom: "1px solid #374151", marginBottom: "20px" }}>
          <div onClick={() => setActiveTab("dashboard")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="/favicon.png" alt="Logo" style={{ height: "40px", width: "40px", borderRadius: "8px", objectFit: "cover" }} />
            <div><div style={{ fontWeight: "bold", fontSize: "16px" }}>SRC Admin</div><div style={{ fontSize: "10px", color: "#9ca3af" }}>Dashboard</div></div>
          </div>
        </div>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto" }}>
          <button onClick={() => setActiveTab("dashboard")} style={{ backgroundColor: activeTab === "dashboard" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>📊</span> Dashboard</button>
          <button onClick={() => setActiveTab("content")} style={{ backgroundColor: activeTab === "content" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>📝</span> Content Manager</button>
          <button onClick={() => setActiveTab("gallery")} style={{ backgroundColor: activeTab === "gallery" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>🖼️</span> Gallery</button>
          <button onClick={() => setActiveTab("messages")} style={{ backgroundColor: activeTab === "messages" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>📧</span> Messages ({messages.length})</button>
          <button onClick={() => setActiveTab("volunteers")} style={{ backgroundColor: activeTab === "volunteers" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>🤝</span> Volunteers ({volunteers.length})</button>
          <button onClick={() => setActiveTab("donations")} style={{ backgroundColor: activeTab === "donations" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>💰</span> Donations</button>
          <button onClick={() => setActiveTab("team")} style={{ backgroundColor: activeTab === "team" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>👥</span> Team Members</button>
          <button onClick={() => setActiveTab("testimonials")} style={{ backgroundColor: activeTab === "testimonials" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>⭐</span> Testimonials</button>
          <button onClick={() => setActiveTab("events")} style={{ backgroundColor: activeTab === "events" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>📅</span> Events</button>
          <button onClick={() => setActiveTab("blogs")} style={{ backgroundColor: activeTab === "blogs" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>📝</span> Blogs</button>
          <button onClick={() => setActiveTab("social")} style={{ backgroundColor: activeTab === "social" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>🔗</span> Social Links</button>
          <button onClick={() => setActiveTab("reports")} style={{ backgroundColor: activeTab === "reports" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>📊</span> Reports</button>
          <button onClick={() => setActiveTab("export")} style={{ backgroundColor: activeTab === "export" ? "#e74c3c" : "transparent", color: "white", border: "none", padding: "12px 20px", margin: "0 12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px" }}><span style={{ fontSize: "18px" }}>💾</span> Backup & Export</button>
        </div>
        
        <div style={{ padding: "20px 12px 0 12px", borderTop: "1px solid #374151", marginTop: "20px" }}>
          <button onClick={() => setAuthenticated(false)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "12px 20px", width: "100%", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", fontSize: "14px", transition: "all 0.2s" }}>
            <span style={{ fontSize: "18px" }}>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px", overflowX: "auto" }}>
        
        {saveMessage && <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>{saveMessage}</div>}
        
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h2>Dashboard Overview</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}><h3>{messages.length}</h3><p>Messages</p></div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}><h3>{volunteers.length}</h3><p>Volunteers</p></div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}><h3>{pendingVolunteers}</h3><p>Pending</p></div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}><h3>₹{totalDonations}</h3><p>Donations</p></div>
            </div>
          </div>
        )}

        {/* Content Manager */}
        {activeTab === "content" && (
          <div>
            <h2>Website Content Manager</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Hero Section</h3>
              <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Main Title" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} placeholder="Subtitle" rows="3" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              <button onClick={saveHeroContent} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Save Hero</button>
            </div>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Statistics Numbers</h3>
              {stats.map((stat, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <input type="text" value={stat.number} onChange={(e) => updateStat(index, "number", e.target.value)} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <input type="text" value={stat.label} onChange={(e) => updateStat(index, "label", e.target.value)} style={{ flex: 2, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <button onClick={() => removeStat(index)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>X</button>
                </div>
              ))}
              <button onClick={addStat} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>+ Add Stat</button>
              <button onClick={saveStatsContent} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Save Stats</button>
            </div>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Mission Section</h3>
              <input type="text" value={missionTitle} onChange={(e) => setMissionTitle(e.target.value)} placeholder="Mission Title" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <textarea value={missionText} onChange={(e) => setMissionText(e.target.value)} placeholder="Mission Text" rows="4" style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              <button onClick={saveMissionContent} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Save Mission</button>
            </div>
          </div>
        )}

        {/* Gallery */}
        {activeTab === "gallery" && (
          <div>
            <h2>Gallery Management</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <form onSubmit={handleImageUpload}>
                <input type="text" placeholder="Image Title" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                <select value={imageCategory} onChange={(e) => setImageCategory(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                  <option>General</option><option>Education</option><option>Healthcare</option><option>Events</option><option>Volunteers</option>
                </select>
                <div style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center", borderRadius: "8px", marginBottom: "10px" }}>
                  <input type="file" accept="image/*" onChange={handleFileSelect} style={{ display: "none" }} id="imageUpload" />
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>{previewUrl ? <img src={previewUrl} alt="Preview" style={{ maxWidth: "200px" }} /> : "📸 Click to select image"}</label>
                </div>
                <button type="submit" disabled={uploading} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>{uploading ? "Uploading..." : "Upload Image"}</button>
              </form>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
              {gallery.map((img) => (
                <div key={img._id} style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden" }}>
                  <img src={img.imageUrl} alt={img.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                  <div style={{ padding: "10px" }}><h4>{img.title}</h4><button onClick={() => deleteGalleryImage(img._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "5px", cursor: "pointer", width: "100%" }}>Delete</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div>
            <h2>Contact Messages</h2>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "8px", marginBottom: "20px", border: "1px solid #ccc", borderRadius: "5px", width: "200px" }} />
            {filteredMessages.map((msg) => (
              <div key={msg._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><h4>{msg.name}</h4><p>{msg.email}</p><p>{msg.message}</p><small>{new Date(msg.createdAt).toLocaleString()}</small></div>
                  <button onClick={() => deleteMessage(msg._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Volunteers */}
        {activeTab === "volunteers" && (
          <div>
            <h2>Volunteer Applications</h2>
            {volunteers.map((vol) => (
              <div key={vol._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><h4>{vol.name}</h4><p>{vol.email} | {vol.phone}</p><p>Status: <strong>{vol.status}</strong></p></div>
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
            {donations.length === 0 ? <p>No donations yet.</p> : (
              <div>
                <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", textAlign: "center" }}>
                  <h3>Total: ₹{totalDonations}</h3><p>From {donations.length} donors</p>
                </div>
                {donations.map((don) => (
                  <div key={don._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                    <h4>{don.name}</h4><p>{don.email}</p><p>₹{don.amount}</p><small>{new Date(don.createdAt).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Team Members */}
        {activeTab === "team" && (
          <div>
            <h2>Team Members Management</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
              <h3>Add New Team Member</h3>
              <input type="text" id="teamName" placeholder="Full Name" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="text" id="teamRole" placeholder="Role" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <textarea id="teamBio" placeholder="Short Bio" rows="3" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              <div style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center", borderRadius: "8px", marginBottom: "10px" }}>
                <input type="file" accept="image/*" onChange={handleTeamImageSelect} style={{ display: "none" }} id="teamImageUpload" />
                <label htmlFor="teamImageUpload" style={{ cursor: "pointer" }}>{teamImagePreview ? <img src={teamImagePreview} alt="Preview" style={{ maxWidth: "150px" }} /> : "📸 Click to upload image"}</label>
              </div>
              <input type="text" id="teamImage" placeholder="Image URL" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="email" id="teamEmail" placeholder="Email" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="text" id="teamPhone" placeholder="Phone" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="number" id="teamOrder" placeholder="Display Order" defaultValue="0" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <button onClick={addTeamMember} disabled={teamUploading} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "12px", borderRadius: "5px", cursor: "pointer" }}>{teamUploading ? "Uploading..." : "Add Team Member"}</button>
            </div>
            <h3>Current Team Members ({team.length})</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
              {team.map((member) => (
                <div key={member._id} style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px" }}>
                  <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    {member.imageUrl && <img src={member.imageUrl} alt={member.name} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }} />}
                    <div><h3>{member.name}</h3><p style={{ color: "#e74c3c" }}>{member.role}</p>{member.bio && <p style={{ fontSize: "13px", color: "#666" }}>{member.bio}</p>}</div>
                    <div><button onClick={() => openEditModal(member)} style={{ backgroundColor: "#f59e0b", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}>Edit</button><button onClick={() => deleteTeamMember(member._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}>Delete</button></div>
                  </div>
                </div>
              ))}
            </div>
            {editModalOpen && (
              <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setEditModalOpen(false)}>
                <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "10px", width: "500px", maxWidth: "90%" }} onClick={(e) => e.stopPropagation()}>
                  <h3>Edit Team Member</h3>
                  <input type="text" id="editName" placeholder="Full Name" defaultValue={editingMember?.name} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <input type="text" id="editRole" placeholder="Role" defaultValue={editingMember?.role} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <textarea id="editBio" placeholder="Short Bio" rows="3" defaultValue={editingMember?.bio} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
                  <input type="text" id="editImage" placeholder="Image URL" defaultValue={editingMember?.imageUrl} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <input type="email" id="editEmail" placeholder="Email" defaultValue={editingMember?.email} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <input type="text" id="editPhone" placeholder="Phone" defaultValue={editingMember?.phone} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <input type="number" id="editOrder" placeholder="Display Order" defaultValue={editingMember?.order} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <button onClick={updateTeamMember} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Save</button>
                  <button onClick={() => setEditModalOpen(false)} style={{ backgroundColor: "#666", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Testimonials with Edit */}
        {activeTab === "testimonials" && (
          <div>
            <h2>Testimonials Management</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Add New Testimonial</h3>
              <input type="text" placeholder="Name" value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="text" placeholder="Role" value={newTestimonial.role} onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <textarea placeholder="Testimonial Text" value={newTestimonial.text} onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })} rows="3" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              <select value={newTestimonial.rating} onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <option value="5">★★★★★ (5)</option><option value="4">★★★★☆ (4)</option><option value="3">★★★☆☆ (3)</option><option value="2">★★☆☆☆ (2)</option><option value="1">★☆☆☆☆ (1)</option>
              </select>
              <input type="text" placeholder="Image URL (optional)" value={newTestimonial.imageUrl} onChange={(e) => setNewTestimonial({ ...newTestimonial, imageUrl: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <button onClick={addTestimonial} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Add Testimonial</button>
            </div>
            <h3>Current Testimonials ({testimonials.length})</h3>
            {testimonials.map((t) => (
              <div key={t._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{t.name}</strong> - {t.role}
                    <p>{t.text}</p>
                    <div style={{ color: "#f39c12" }}>{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                  </div>
                  <div>
                    <button onClick={() => openEditTestimonialModal(t)} style={{ backgroundColor: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>Edit</button>
                    <button onClick={() => deleteTestimonial(t._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Edit Testimonial Modal */}
            {editTestimonialModal && (
              <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setEditTestimonialModal(false)}>
                <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "10px", width: "500px", maxWidth: "90%" }} onClick={(e) => e.stopPropagation()}>
                  <h3>Edit Testimonial</h3>
                  <input type="text" placeholder="Name" value={editTestimonialData.name} onChange={(e) => setEditTestimonialData({ ...editTestimonialData, name: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <input type="text" placeholder="Role" value={editTestimonialData.role} onChange={(e) => setEditTestimonialData({ ...editTestimonialData, role: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <textarea placeholder="Testimonial Text" value={editTestimonialData.text} onChange={(e) => setEditTestimonialData({ ...editTestimonialData, text: e.target.value })} rows="3" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
                  <select value={editTestimonialData.rating} onChange={(e) => setEditTestimonialData({ ...editTestimonialData, rating: parseInt(e.target.value) })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <option value="5">★★★★★ (5)</option><option value="4">★★★★☆ (4)</option><option value="3">★★★☆☆ (3)</option><option value="2">★★☆☆☆ (2)</option><option value="1">★☆☆☆☆ (1)</option>
                  </select>
                  <input type="text" placeholder="Image URL (optional)" value={editTestimonialData.imageUrl} onChange={(e) => setEditTestimonialData({ ...editTestimonialData, imageUrl: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button onClick={updateTestimonial} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Save Changes</button>
                    <button onClick={() => setEditTestimonialModal(false)} style={{ backgroundColor: "#666", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Events */}
        {activeTab === "events" && (
          <div>
            <h2>Events Management</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Add New Event</h3>
              <input type="text" placeholder="Event Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} rows="3" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              <input type="date" placeholder="Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="time" placeholder="Time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="text" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="text" placeholder="Image URL" value={newEvent.imageUrl} onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <button onClick={addEvent} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Add Event</button>
            </div>
            <h3>Upcoming Events ({events.length})</h3>
            {events.map((e) => (
              <div key={e._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><strong>{e.title}</strong> - {e.date} {e.time}<p>{e.description}</p><p>📍 {e.location}</p></div>
                  <button onClick={() => deleteEvent(e._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blogs */}
        {activeTab === "blogs" && (
          <div>
            <h2>Blog Management</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Write New Blog</h3>
              <input type="text" placeholder="Title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="text" placeholder="Category" value={newBlog.category} onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <textarea placeholder="Excerpt (short summary)" value={newBlog.excerpt} onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })} rows="2" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              <textarea placeholder="Full Content" value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} rows="6" style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }}></textarea>
              <input type="text" placeholder="Image URL" value={newBlog.imageUrl} onChange={(e) => setNewBlog({ ...newBlog, imageUrl: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <button onClick={addBlog} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Publish Blog</button>
            </div>
            <h3>Published Blogs ({blogs.length})</h3>
            {blogs.map((b) => (
              <div key={b._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><strong>{b.title}</strong> - {b.category}<p>{b.excerpt}</p></div>
                  <button onClick={() => deleteBlog(b._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Social Links */}
        {activeTab === "social" && (
          <div>
            <h2>Social Media Links</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Add Social Link</h3>
              <input type="text" placeholder="Platform (Facebook, Twitter, Instagram, LinkedIn, YouTube)" value={newSocialLink.platform} onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="url" placeholder="URL (https://...)" value={newSocialLink.url} onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <input type="number" placeholder="Display Order" value={newSocialLink.order} onChange={(e) => setNewSocialLink({ ...newSocialLink, order: parseInt(e.target.value) })} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              <button onClick={addSocialLink} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Add Social Link</button>
            </div>
            <h3>Current Social Links</h3>
            {socialLinks.map((link) => (
              <div key={link._id} style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px", display: "flex", justifyContent: "space-between" }}>
                <div><strong>{link.platform}</strong>: {link.url}</div>
                <button onClick={() => deleteSocialLink(link._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {/* Reports */}
        {activeTab === "reports" && (
          <div>
            <h2>Donation Reports</h2>
            {reportData ? (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px" }}>
                  <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}><h3>₹{reportData.totalAmount}</h3><p>Total Donations</p></div>
                  <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}><h3>{reportData.totalDonations}</h3><p>Number of Donors</p></div>
                  <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}><h3>₹{Math.round(reportData.averageAmount)}</h3><p>Average Donation</p></div>
                </div>
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
                  <h3>Monthly Breakdown</h3>
                  {Object.entries(reportData.monthlyData).map(([month, amount]) => (
                    <div key={month} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                      <span>{month}</span><span>₹{amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : <p>Loading report data...</p>}
          </div>
        )}

        {/* Export */}
        {activeTab === "export" && (
          <div>
            <h2>Backup & Export</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h3>Export All Data</h3>
              <p>Download all your data as JSON or CSV files for backup purposes.</p>
              <button onClick={exportData} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "12px 24px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>📥 Export as JSON</button>
              <button onClick={() => exportToCSV(messages, "messages")} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "12px 24px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>📊 Export Messages CSV</button>
              <button onClick={() => exportToCSV(volunteers, "volunteers")} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "12px 24px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>🤝 Export Volunteers CSV</button>
              <button onClick={() => exportToCSV(donations, "donations")} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "12px 24px", borderRadius: "5px", cursor: "pointer" }}>💰 Export Donations CSV</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
