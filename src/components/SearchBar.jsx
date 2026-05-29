import { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Define all searchable content
  const allContent = [
    { title: "Home", url: "/", category: "Page", content: "SRC Welfare Trust, education, healthcare, food drives" },
    { title: "About Us", url: "/about", category: "Page", content: "mission, vision, impact, about SRC Welfare Trust" },
    { title: "Programs", url: "/programs", category: "Page", content: "education programs, healthcare camps, food security, women empowerment" },
    { title: "Gallery", url: "/gallery", category: "Page", content: "photos, images, events, activities" },
    { title: "Blog", url: "/blog", category: "Page", content: "news, updates, stories, articles" },
    { title: "Events", url: "/events", category: "Page", content: "upcoming events, charity run, health camp, workshops" },
    { title: "Volunteer", url: "/volunteer", category: "Page", content: "volunteer opportunities, application, join us" },
    { title: "FAQ", url: "/faq", category: "Page", content: "frequently asked questions, donations, volunteering" },
    { title: "Contact", url: "/contact", category: "Page", content: "contact information, address, phone, email" },
    { title: "Donate", url: "/donate", category: "Page", content: "donations, contribute, support, fundraiser" },
    { title: "Admin", url: "/admin", category: "Page", content: "admin login, dashboard, messages" }
  ]

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    
    if (term.length > 1) {
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.content.toLowerCase().includes(term.toLowerCase())
      )
      setResults(filtered)
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  return (
    <div style={{ position: "relative", margin: "0 10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: "10px", color: "#999" }}>🔍</span>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "8px 15px 8px 35px",
            borderRadius: "25px",
            border: "none",
            width: "200px",
            fontSize: "14px",
            outline: "none"
          }}
        />
      </div>
      
      {showResults && results.length > 0 && (
        <div style={{
          position: "absolute",
          top: "40px",
          right: "0",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "280px",
          maxHeight: "300px",
          overflowY: "auto",
          zIndex: 1000
        }}>
          {results.map((result, index) => (
            <Link
              key={index}
              to={result.url}
              onClick={() => {
                setSearchTerm("")
                setShowResults(false)
              }}
              style={{
                display: "block",
                padding: "12px 15px",
                textDecoration: "none",
                color: "#333",
                borderBottom: "1px solid #eee",
                transition: "background 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
            >
              <div style={{ fontWeight: "bold" }}>{result.title}</div>
              <div style={{ fontSize: "12px", color: "#e74c3c" }}>{result.category}</div>
            </Link>
          ))}
        </div>
      )}
      
      {showResults && results.length === 0 && searchTerm.length > 1 && (
        <div style={{
          position: "absolute",
          top: "40px",
          right: "0",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "280px",
          padding: "15px",
          textAlign: "center",
          color: "#999"
        }}>
          No results found for "{searchTerm}"
        </div>
      )}
    </div>
  )
}

export default SearchBar