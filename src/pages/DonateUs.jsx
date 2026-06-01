import { useState } from "react"

function DonateUs() {
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [customAmount, setCustomAmount] = useState("")

  const presetAmounts = [500, 1000, 2000, 5000]

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleAmountSelect = (amt) => {
    setAmount(amt)
    setCustomAmount("")
  }

  const handleCustomAmount = (e) => {
    const value = e.target.value
    setCustomAmount(value)
    setAmount(value)
  }

  const handlePayment = async () => {
    const finalAmount = amount || customAmount
    if (!finalAmount || !name || !email) {
      alert("Please fill all fields and select/enter an amount")
      return
    }

    if (finalAmount < 10) {
      alert("Minimum donation amount is ₹10")
      return
    }

    setLoading(true)
    const res = await loadRazorpayScript()

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.")
      setLoading(false)
      return
    }

    // Your Razorpay Test Keys
    const options = {
      key: "rzp_test_SwFmt0zzFWp1o0",
      amount: Math.round(parseFloat(finalAmount) * 100),
      currency: "INR",
      name: "SRC Welfare Trust",
      description: "Donation for a cause",
      image: "/favicon.png",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`)
        saveDonation(response.razorpay_payment_id)
        setAmount("")
        setCustomAmount("")
        setName("")
        setEmail("")
      },
      prefill: {
        name: name,
        email: email,
      },
      theme: {
        color: "#e74c3c",
      },
      modal: {
        ondismiss: function () {
          setLoading(false)
        }
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    setLoading(false)
  }

  const saveDonation = async (paymentId) => {
    try {
      await fetch("https://src-welfare-backend.onrender.com/api/admin/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          amount: amount || customAmount,
          paymentId: paymentId
        })
      })
    } catch (error) {
      console.error("Error saving donation:", error)
    }
  }

  return (
    <div style={{ padding: "80px 20px", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <div style={{ maxWidth: "550px", margin: "0 auto", backgroundColor: "white", padding: "40px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
        
        <h1 style={{ fontSize: "36px", textAlign: "center", marginBottom: "10px", color: "#e74c3c" }}>Donate Now</h1>
        <p style={{ textAlign: "center", marginBottom: "40px", color: "#666" }}>Your contribution changes lives</p>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "16px" }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "16px" }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Select Amount (₹)</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "15px" }}>
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handleAmountSelect(amt)}
                style={{
                  padding: "12px",
                  backgroundColor: amount === amt ? "#e74c3c" : "#f3f4f6",
                  color: amount === amt ? "white" : "#333",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          
          <input
            type="number"
            placeholder="Or enter custom amount (₹)"
            value={customAmount}
            onChange={handleCustomAmount}
            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "16px" }}
          />
        </div>
        
        <button
          onClick={handlePayment}
          disabled={loading || (!amount && !customAmount) || !name || !email}
          style={{
            width: "100%",
            backgroundColor: loading ? "#ccc" : "#e74c3c",
            color: "white",
            padding: "16px",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "10px"
          }}
        >
          {loading ? "Processing..." : `Donate ₹${amount || customAmount || "0"}`}
        </button>
        
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#999" }}>
          🔒 Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  )
}

export default DonateUs