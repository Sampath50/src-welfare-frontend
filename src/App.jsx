import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import DonateUs from './pages/DonateUs'
import ProgramsUs from './pages/ProgramsUs'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ 
          backgroundColor: "#1f2937", 
          padding: "15px 20px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px"
        }}>
          <h2 style={{ color: "white", margin: 0 }}>SRC Welfare Trust</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
            <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
            <Link to="/programs" style={{ color: "white", textDecoration: "none" }}>Programs</Link>
            <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
            <Link to="/donate" style={{ color: "white", textDecoration: "none", backgroundColor: "#2563eb", padding: "5px 15px", borderRadius: "5px" }}>Donate</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/programs" element={<ProgramsUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/donate" element={<DonateUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App