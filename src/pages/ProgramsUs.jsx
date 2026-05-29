function ProgramsUs() {
  const programs = [
    { title: "Education for All", description: "Providing quality education to underprivileged children", icon: "📚" },
    { title: "Healthcare Camps", description: "Free medical checkups and medicine distribution", icon: "🏥" },
    { title: "Food Security", description: "Regular food distribution to needy families", icon: "🍲" },
    { title: "Women Empowerment", description: "Skill development and livelihood programs", icon: "👩" },
    { title: "Clean Water", description: "Providing clean drinking water to villages", icon: "💧" },
    { title: "Emergency Relief", description: "Quick response during natural disasters", icon: "🚨" }
  ]

  return (
    <div>
      <div style={{ backgroundColor: "#2563eb", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Our Programs</h1>
        <p style={{ fontSize: "18px" }}>Making a difference through action</p>
      </div>
      
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {programs.map((program, index) => (
            <div key={index} style={{ backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center" }}>
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>{program.icon}</div>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>{program.title}</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgramsUs