import { useState, useEffect } from "react"

function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("https://src-welfare-backend.onrender.com/api/admin/gallery")
      const data = await response.json()
      if (data.success) {
        setImages(data.images || [])
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories
  const categories = ["All", ...new Set(images.map(img => img.category).filter(Boolean))]

  const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter)

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Loading gallery...</h2>
      </div>
    )
  }

  return (
    <div>
      <div style={{ backgroundColor: "#e74c3c", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>Our Gallery</h1>
        <p style={{ fontSize: "18px" }}>Moments that matter</p>
      </div>

      <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Category Filter */}
        {categories.length > 1 && (
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: filter === cat ? "#e74c3c" : "#f3f4f6",
                  color: filter === cat ? "white" : "#333",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", backgroundColor: "#f9fafb", borderRadius: "10px" }}>
            <p>No images in gallery yet. Please check back later.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
            {filteredImages.map((img) => (
              <div
                key={img._id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.3s"
                }}
                onClick={() => setSelectedImage(img)}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img 
                  src={img.imageUrl} 
                  alt={img.title} 
                  style={{ width: "100%", height: "250px", objectFit: "cover" }} 
                />
                <div style={{ padding: "15px" }}>
                  <h3 style={{ margin: "0 0 5px 0" }}>{img.title}</h3>
                  <p style={{ color: "#e74c3c", margin: 0, fontSize: "14px" }}>{img.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal - Click to enlarge */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer"
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ maxWidth: "90%", maxHeight: "90%" }}>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              style={{ 
                width: "100%", 
                height: "auto", 
                borderRadius: "10px", 
                maxHeight: "80vh", 
                objectFit: "contain" 
              }}
            />
            <h3 style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
              {selectedImage.title}
            </h3>
            <p style={{ color: "#e74c3c", textAlign: "center" }}>
              {selectedImage.category}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery