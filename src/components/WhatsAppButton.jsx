function WhatsAppButton() {
  const phoneNumber = "918374848542"; // Replace with your WhatsApp number (country code + number, no '+' or spaces)
  const message = "Hello! I have a question about SRC Welfare Trust";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
        zIndex: 9999,
        transition: "transform 0.3s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        style={{ width: "32px", height: "32px" }}
      />
    </a>
  );
}

export default WhatsAppButton;