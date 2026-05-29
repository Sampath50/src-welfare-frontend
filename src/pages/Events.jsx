function Events() {
  const events = [
    {
      id: 1,
      title: "Annual Charity Run",
      date: "April 20, 2024",
      time: "7:00 AM - 10:00 AM",
      location: "Marina Beach, Chennai",
      description: "Join us for a 5K run to raise funds for education",
      image: "https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?w=600"
    },
    {
      id: 2,
      title: "Free Health Checkup Camp",
      date: "April 25, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Community Hall, Velachery",
      description: "Free medical consultation and medicines",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600"
    },
    {
      id: 3,
      title: "Education Awareness Workshop",
      date: "May 5, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Government School, Tambaram",
      description: "Workshop on importance of girl child education",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600"
    }
  ]

  return (
    <div>
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Upcoming Events</h1>
        <p style={{ fontSize: "18px" }}>Join us and make a difference</p>
      </div>

      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {events.map(event => (
            <div key={event.id} style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <img src={event.image} alt={event.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>{event.title}</h3>
                <p>📅 {event.date}</p>
                <p>⏰ {event.time}</p>
                <p>📍 {event.location}</p>
                <p style={{ color: "#666", marginTop: "10px" }}>{event.description}</p>
                <button style={{ marginTop: "15px", backgroundColor: "#e74c3c", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events