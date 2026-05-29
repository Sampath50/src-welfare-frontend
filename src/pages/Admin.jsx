import { useState, useEffect } from "react"

function Admin() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === "admin123") {
      setAuthenticated(true)
    } else {
      alert("Wrong password!")
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchMessages()
    }
  }, [authenticated])

  const fetchMessages = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/contact")
      const data = await response.json()
      if (data.success) {
        setMessages(data.messages)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id) => {
    if (window.confirm("Delete this message?")) {
      try {
        await fetch(`https://src-welfare-backend.onrender.com/api/contact/${id}`, {
          method: "DELETE"
        })
        fetchMessages()
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "15px", width: "300px" }}>
          <h2 style={{ textAlign: "center" }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{ width: "100%", padding: "10px", margin: "20px 0", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Login
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#666" }}>Password: admin123</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px" }}>Admin Dashboard</h1>
        <p>Total Messages: {messages.length}</p>
        
        {loading ? <p>Loading...</p> : messages.length === 0 ? <p>No messages yet.</p> : (
          messages.map((msg) => (
            <div key={msg._id} style={{ backgroundColor: "white", padding: "20px", marginBottom: "20px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3>{msg.name}</h3>
                  <p>📧 {msg.email}</p>
                  <p>{msg.message}</p>
                  <p style={{ fontSize: "12px", color: "#999" }}>{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => deleteMessage(msg._id)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Admin