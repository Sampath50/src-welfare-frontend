import { useState, useEffect } from "react"

function Admin() {
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
    <div style={{ padding: "40px", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to Admin Panel!</p>
      <button onClick={() => setAuthenticated(false)} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  )
}

export default Admin