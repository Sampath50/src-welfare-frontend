import { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const allContent = [
    { title: "Home", url: "/", category: "Page" },
    { title: "About Us", url: "/about", category: "Page" },
    { title: "Programs", url: "/programs", category: "Page" },
    { title: "Gallery", url: "/gallery", category: "Page" },
    { title: "Blog", url: "/blog", category: "Page" },
    { title: "Events", url: "/events", category: "Page" },
    { title: "Volunteer", url: "/volunteer", category: "Page" },
    { title: "FAQ", url: "/faq", category: "Page" },
    { title: "Contact", url: "/contact", category: "Page" },
    { title: "Donate", url: "/donate", category: "Page" },
    { title: "Admin", url: "/admin", category: "Page" }
  ]

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    
    if (term.length > 1) {
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(term.toLowerCase())
      )
      setResults(filtered)
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: "6px 12px",
          borderRadius: "20px",
          border: "none",
          width: "150px",
          fontSize: "14px",
          outline: "none"
        }}
      />
      
      {showResults && results.length > 0 && (
        <div style={{
          position: "absolute",
          top: "30px",
          right: "0",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "200px",
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
                padding: "10px",
                textDecoration: "none",
                color: "#333",
                borderBottom: "1px solid #eee"
              }}
            >
              {result.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar