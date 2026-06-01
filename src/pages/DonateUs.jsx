import { useState } from "react"

function DonateUs() {
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [customAmount, setCustomAmount] = useState("")
  const [currency, setCurrency] = useState("INR")

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 1 },
    { code: "USD", symbol: "$", name: "US Dollar", rate: 0.012 },
    { code: "EUR", symbol: "€", name: "Euro", rate: 0.011 },
    { code: "GBP", symbol: "£", name: "British Pound", rate: 0.0095 },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 0.044 },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 0.016 },
    { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 0.018 },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar", rate: 0.016 }
  ]

  const getCurrencySymbol = () => {
    const curr = currencies.find(c => c.code === currency)
    return curr ? curr.symbol : "₹"
  }

  const getPresetAmounts = () => {
    const curr = currencies.find(c => c.code === currency)
    if (currency === "INR") return [500, 1000, 2000, 5000]
    if (currency === "USD") return [10, 25, 50, 100]
    if (currency === "EUR") return [10, 25, 50, 100]
    if (currency === "GBP") return [10, 25, 50, 100]
    return [500, 1000, 2000, 5000]
  }

  const presetAmounts = getPresetAmounts()

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

  const convertToINR = (amt) => {
    const curr = currencies.find(c => c.code === currency)
    if (currency === "INR") return amt
    return Math.round(amt / curr.rate)
  }

  const handlePayment = async () => {
    const finalAmount = amount || customAmount
    if (!finalAmount || !name || !email) {
      alert("Please fill all fields and select/enter an amount")
      return
    }

    if (finalAmount < 10) {
      alert(`Minimum donation amount is ${getCurrencySymbol()}10`)
      return
    }

    setLoading(true)
    const res = await loadRazorpayScript()

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.")
      setLoading(false)
      return
    }

    const amountInINR = convertToINR(finalAmount)

    const options = {
      key: "rzp_test_SwFmt0zzFWp1o0",
      amount: Math.round(amountInINR * 100),
      currency: "INR",
      name: "SRC Welfare Trust",
      description: `Donation (${currency} ${finalAmount})`,
      image: "/favicon.png",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`)
        saveDonation(response.razorpay_payment_id, finalAmount, currency)
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
        color: "#dc2626",
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

  const saveDonation = async (paymentId, donationAmount, donationCurrency) => {
    try {
      await fetch("https://src-welfare-backend.onrender.com/api/admin/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          amount: donationAmount,
          currency: donationCurrency,
          paymentId: paymentId
        })
      })
    } catch (error) {
      console.error("Error saving donation:", error)
    }
  }

  const currentSymbol = getCurrencySymbol()

  return (
    <div style={{ padding: "80px 20px", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "550px", margin: "0 auto", backgroundColor: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        
        <h1 style={{ fontSize: "32px", textAlign: "center", marginBottom: "10px", color: "#1f2937", fontWeight: "700" }}>Donate Now</h1>
        <p style={{ textAlign: "center", marginBottom: "30px", color: "#6b7280" }}>Your contribution changes lives</p>
        
        {/* Currency Selector */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#1f2937" }}>Select Currency</label>
          <select 
            value={currency} 
            onChange={(e) => {
              setCurrency(e.target.value)
              setAmount("")
              setCustomAmount("")
            }}
            style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "16px", backgroundColor: "white", cursor: "pointer" }}
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
            ))}
          </select>
        </div>
        
        {/* Name Field */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#1f2937" }}>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "16px" }}
          />
        </div>
        
        {/* Email Field */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#1f2937" }}>Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "16px" }}
          />
        </div>
        
        {/* Amount Selection */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#1f2937" }}>Select Amount ({currentSymbol})</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "15px" }}>
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handleAmountSelect(amt)}
                style={{
                  padding: "10px",
                  backgroundColor: amount === amt ? "#dc2626" : "#f3f4f6",
                  color: amount === amt ? "white" : "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.3s"
                }}
              >
                {currentSymbol}{amt}
              </button>
            ))}
          </div>
          
          <input
            type="number"
            placeholder={`Or enter custom amount (${currentSymbol})`}
            value={customAmount}
            onChange={handleCustomAmount}
            style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "16px" }}
          />
        </div>
        
        {/* Donate Button */}
        <button
          onClick={handlePayment}
          disabled={loading || (!amount && !customAmount) || !name || !email}
          style={{
            width: "100%",
            backgroundColor: loading ? "#9ca3af" : "#dc2626",
            color: "white",
            padding: "14px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
            marginTop: "10px"
          }}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.backgroundColor = "#b91c1c"
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.backgroundColor = "#dc2626"
          }}
        >
          {loading ? "Processing..." : `Donate ${currentSymbol}${amount || customAmount || "0"}`}
        </button>
        
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#9ca3af" }}>
          🔒 Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  )
}

export default DonateUs