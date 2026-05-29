import { useState } from "react"

function DonateUs() {
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handlePayment = () => {
    if (!amount || !name || !email) {
      alert("Please fill all fields")
      return
    }
    alert(`Thank you for donating ₹${amount}! We'll contact you at ${email}`)
  }

  return (
    <div style={{ padding: "80px 20px", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", backgroundColor: "white", padding: "40px", borderRadius: "15px" }}>
        <h1 style={{ fontSize: "36px", textAlign: "center", marginBottom: "10px" }}>Donate Now</h1>
        <p style={{ textAlign: "center", marginBottom: "40px", color: "#666" }}>Your contribution changes lives</p>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}
            placeholder="Enter your name"
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}
            placeholder="your@email.com"
          />
        </div>
        
        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}
            placeholder="Enter amount"
          />
        </div>
        
        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "15px",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Donate ₹{amount || "0"}
        </button>
      </div>
    </div>
  )
}

export default DonateUs