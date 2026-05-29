import { useState } from "react"

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How can I donate to SRC Welfare Trust?",
      answer: "You can donate through our Donate page using credit/debit cards, UPI, or bank transfer. We also accept monthly donations."
    },
    {
      question: "Where does my donation go?",
      answer: "100% of your donation goes directly to our programs. We maintain complete transparency with detailed reports."
    },
    {
      question: "How can I become a volunteer?",
      answer: "Fill out the volunteer application form on our Volunteer page. We'll contact you within 3-5 business days."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes, we are a registered NGO (80G certified). You will receive a tax receipt for your donation."
    },
    {
      question: "How can I sponsor a child's education?",
      answer: "Contact us directly at sponsorship@srcwelfare.org to learn about our child sponsorship program."
    }
  ]

  return (
    <div>
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: "18px" }}>Find answers to common questions</p>
      </div>

      <div style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden" }}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: "100%",
                padding: "20px",
                textAlign: "left",
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>{faq.question}</span>
              <span style={{ fontSize: "24px" }}>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderTop: "1px solid #e0e0e0" }}>
                <p style={{ color: "#666", lineHeight: "1.6" }}>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ