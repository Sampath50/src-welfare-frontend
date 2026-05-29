import { useState } from "react"

function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus(""), 3000)
    }, 1000)
  }

  return (
    <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "10px" }}>Subscribe to Our Newsletter</h2>
        <p style={{ marginBottom: "30px", opacity: 0.9 }}>Get updates about our work and how you can help</p>
        
        {status === "success" && <div style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: "10px", borderRadius: "8px", marginBottom: "20px" }}>✅ Subscribed successfully!</div>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "12px 20px", borderRadius: "30px", border: "none", width: "300px", fontSize: "16px" }}
          />
          <button type="submit" style={{ padding: "12px 30px", backgroundColor: "#1f2937", color: "white", border: "none", borderRadius: "30px", cursor: "pointer" }}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Newsletter