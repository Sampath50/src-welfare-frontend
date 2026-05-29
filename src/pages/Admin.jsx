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
      console.error("Error fetching messages:", error)
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
        fetchMessages() // Refresh list
      } catch (error) {
        console.error("Error deleting:", error)
      }
    }
  }

  if (!authenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1f2937" }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px"
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Login
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#666" }}>
            Default password: <strong>admin123</strong>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "36px", color: "#1f2937" }}>Admin Dashboard</h1>
          <button
            onClick={() => setAuthenticated(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
        
        <p style={{ marginBottom: "20px", color: "#666" }}>
          Total Messages: <strong>{messages.length}</strong>
        </p>
        
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <div style={{
            backgroundColor: "white",
            padding: "60px",
            textAlign: "center",
            borderRadius: "10px"
          }}>
            <p>No messages yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>{msg.name}</h3>
                  <p style={{ margin: "5px 0", color: "#2563eb" }}>📧 {msg.email}</p>
                  <p style={{
                    margin: "15px 0 10px 0",
                    padding: "15px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    lineHeight: "1.6"
                  }}>
                    {msg.message}
                  </p>
                  <p style={{ fontSize: "12px", color: "#999", margin: "10px 0 0 0" }}>
                    📅 {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteMessage(msg._id)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginLeft: "20px"
                  }}
                >
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