function ContactUs() {
  return (
    <div>
      <div style={{ backgroundColor: "#2563eb", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Contact Us</h1>
        <p style={{ fontSize: "18px" }}>Get in touch with us</p>
      </div>
      
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "50px" }}>
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Get in Touch</h2>
            <div style={{ marginBottom: "20px" }}>
              <p><strong>📍 Address:</strong> D.No.1-1-27/2 Plot No-2 3rd floor Kapra, Hyederabad, Telengana</p>
              <p><strong>📞 Phone:</strong> +91 9392302450</p>
              <p><strong>📧 Email:</strong> info@srcwelfare.org</p>
              <p><strong>⏰ Office Hours:</strong> Mon-Fri, 9 AM - 6 PM</p>
            </div>
          </div>
          
          <div>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Send a Message</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>Or use the contact form on our homepage</p>
            <div style={{ backgroundColor: "#f3f4f6", padding: "20px", borderRadius: "10px" }}>
              <p>📧 <strong>Email us directly:</strong> care@srcwelfare.org</p>
              <p>📱 <strong>WhatsApp:</strong> +91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs