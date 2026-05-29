function Gallery() {
  const images = [
    { id: 1, title: "Education Program", url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400" },
    { id: 2, title: "Medical Camp", url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400" },
    { id: 3, title: "Food Distribution", url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400" },
    { id: 4, title: "Community Help", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400" },
    { id: 5, title: "Volunteers", url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400" },
    { id: 6, title: "Awareness Campaign", url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400" }
  ]

  return (
    <div>
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Our Gallery</h1>
        <p style={{ fontSize: "18px" }}>Moments that matter</p>
      </div>
      
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {images.map((img) => (
            <div key={img.id} style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <img src={img.url} alt={img.title} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: 0 }}>{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery