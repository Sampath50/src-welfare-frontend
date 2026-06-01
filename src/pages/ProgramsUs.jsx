import { useState } from "react"

function ProgramsUs() {
  const [selectedProgram, setSelectedProgram] = useState(null)

  const programs = [
    { 
      id: 1,
      title: "Education for All", 
      description: "Providing quality education to underprivileged children through scholarships, school supplies, and tutoring programs.",
      icon: "📚",
      longDescription: `
        <p>Our Education for All program aims to break the cycle of poverty through quality education. We believe every child deserves access to learning, regardless of their economic background.</p>
        
        <h4>Key Initiatives:</h4>
        <ul>
          <li>Scholarships for meritorious students from low-income families</li>
          <li>Distribution of school supplies (books, notebooks, uniforms, bags)</li>
          <li>After-school tutoring and mentoring programs</li>
          <li>Digital literacy classes and computer education</li>
          <li>Career counseling and guidance</li>
        </ul>
        
        <h4>Impact So Far:</h4>
        <ul>
          <li>500+ students supported annually</li>
          <li>95% school retention rate</li>
          <li>200+ scholarships awarded</li>
          <li>10+ partner schools</li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      color: "#3b82f6"
    },
    { 
      id: 2,
      title: "Healthcare Camps", 
      description: "Free medical checkups, medicine distribution, and health awareness camps in rural areas.",
      icon: "🏥",
      longDescription: `
        <p>Our Healthcare Camps bring essential medical services to remote villages where access to healthcare is limited. We organize free checkup camps with qualified doctors and volunteers.</p>
        
        <h4>Services Provided:</h4>
        <ul>
          <li>General health checkups and consultations</li>
          <li>Free medicine distribution</li>
          <li>Dental and eye checkup camps</li>
          <li>Health awareness sessions on hygiene, nutrition, and disease prevention</li>
          <li>Special camps for children, elderly, and pregnant women</li>
        </ul>
        
        <h4>Impact So Far:</h4>
        <ul>
          <li>50+ medical camps organized</li>
          <li>10,000+ patients treated</li>
          <li>100+ doctors volunteered</li>
          <li>Medicines worth ₹25 lakhs distributed</li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600",
      color: "#10b981"
    },
    { 
      id: 3,
      title: "Food Security", 
      description: "Regular food distribution to needy families, especially during emergencies and festivals.",
      icon: "🍲",
      longDescription: `
        <p>Our Food Security program ensures that no family goes to bed hungry. We distribute nutritious food packets, dry rations, and cooked meals to underprivileged communities.</p>
        
        <h4>Key Initiatives:</h4>
        <ul>
          <li>Monthly dry ration distribution to 500+ families</li>
          <li>Daily meals for children in slum areas</li>
          <li>Special food drives during festivals and emergencies</li>
          <li>Nutrition awareness programs</li>
          <li>Community kitchen for elderly and differently-abled</li>
        </ul>
        
        <h4>Impact So Far:</h4>
        <ul>
          <li>1,00,000+ meals served</li>
          <li>1000+ families supported monthly</li>
          <li>50+ community kitchens established</li>
          <li>Partnered with 10+ food vendors</li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600",
      color: "#f59e0b"
    },
    { 
      id: 4,
      title: "Women Empowerment", 
      description: "Skill development, vocational training, and livelihood programs for women.",
      icon: "👩",
      longDescription: `
        <p>Our Women Empowerment program focuses on making women self-reliant through skill development, vocational training, and entrepreneurship support.</p>
        
        <h4>Key Initiatives:</h4>
        <ul>
          <li>Tailoring and embroidery training</li>
          <li>Computer literacy and digital skills</li>
          <li>Small business management workshops</li>
          <li>Financial literacy and savings groups</li>
          <li>Leadership and confidence building sessions</li>
        </ul>
        
        <h4>Impact So Far:</h4>
        <ul>
          <li>200+ women trained annually</li>
          <li>50+ women started their own businesses</li>
          <li>30+ self-help groups formed</li>
          <li>Average income increase of 40% for participants</li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
      color: "#ef4444"
    },
    { 
      id: 5,
      title: "Clean Water", 
      description: "Providing clean drinking water to villages through water filters, wells, and awareness programs.",
      icon: "💧",
      longDescription: `
        <p>Access to clean drinking water is a basic human right. Our Clean Water program installs water purification systems and creates awareness about water conservation.</p>
        
        <h4>Key Initiatives:</h4>
        <ul>
          <li>Installation of water filters in schools and community centers</li>
          <li>Repair and restoration of borewells and hand pumps</li>
          <li>Rainwater harvesting projects</li>
          <li>Water quality testing and monitoring</li>
          <li>Awareness campaigns on water conservation</li>
        </ul>
        
        <h4>Impact So Far:</h4>
        <ul>
          <li>100+ water filters installed</li>
          <li>50+ borewells repaired</li>
          <li>20+ villages covered</li>
          <li>50,000+ people have access to clean water</li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1542762933500-9eced1b1f0d4?w=600",
      color: "#06b6d4"
    },
    { 
      id: 6,
      title: "Emergency Relief", 
      description: "Quick response during natural disasters with food, shelter, and medical aid.",
      icon: "🚨",
      longDescription: `
        <p>During times of crisis, our Emergency Relief team mobilizes quickly to provide immediate assistance to affected communities. We work round the clock to save lives and provide essential supplies.</p>
        
        <h4>Key Initiatives:</h4>
        <ul>
          <li>24/7 emergency response team</li>
          <li>Distribution of emergency food and water kits</li>
          <li>Temporary shelter and rehabilitation support</li>
          <li>Medical assistance and first aid</li>
          <li>Post-disaster recovery and rebuilding</li>
        </ul>
        
        <h4>Impact So Far:</h4>
        <ul>
          <li>Responded to 15+ natural disasters</li>
          <li>10,000+ people assisted during emergencies</li>
          <li>100+ tons of relief material distributed</li>
          <li>Partnered with 5+ disaster management agencies</li>
        </ul>
      `,
      image: "https://images.unsplash.com/photo-1599733589046-47e6788ef98c?w=600",
      color: "#8b5cf6"
    }
  ]

  const closeModal = () => {
    setSelectedProgram(null)
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Our Programs</h1>
        <p style={{ fontSize: "18px" }}>Making a difference through action</p>
      </div>
      
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Programs Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {programs.map((program) => (
            <div 
              key={program.id} 
              style={{ 
                backgroundColor: "white", 
                borderRadius: "15px", 
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s",
                cursor: "pointer"
              }}
              onClick={() => setSelectedProgram(program)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img 
                  src={program.image} 
                  alt={program.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
              <div style={{ padding: "25px" }}>
                <div style={{ fontSize: "50px", marginBottom: "10px" }}>{program.icon}</div>
                <h3 style={{ fontSize: "24px", marginBottom: "10px", color: program.color }}>{program.title}</h3>
                <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "15px" }}>{program.description}</p>
                <button 
                  style={{
                    backgroundColor: program.color,
                    color: "white",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "20px",
                    cursor: "pointer"
                  }}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Program Details */}
      {selectedProgram && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            overflow: "auto",
            padding: "20px"
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "white",
              maxWidth: "700px",
              width: "100%",
              borderRadius: "15px",
              overflow: "hidden",
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative", height: "200px" }}>
              <img 
                src={selectedProgram.image} 
                alt={selectedProgram.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
              <button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "white",
                  border: "none",
                  fontSize: "20px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: "30px" }}>
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>{selectedProgram.icon}</div>
              <h2 style={{ fontSize: "32px", marginBottom: "15px", color: selectedProgram.color }}>{selectedProgram.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: selectedProgram.longDescription }} />
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: selectedProgram.color,
                  color: "white",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  marginTop: "20px"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramsUs