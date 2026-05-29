import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import DonateUs from './pages/DonateUs'
import ProgramsUs from './pages/ProgramsUs'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import Blog from './pages/Blog'
import Volunteer from './pages/Volunteer'
import Events from './pages/Events'
import FAQ from './pages/FAQ'

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
            <Link to="/gallery" style={{ color: "white", textDecoration: "none" }}>Gallery</Link>
            <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
            <Link to="/donate" style={{ color: "white", textDecoration: "none", backgroundColor: "#2563eb", padding: "5px 15px", borderRadius: "5px" }}>Donate</Link>
            <Link to="/admin" style={{ color: "white", textDecoration: "none", backgroundColor: "#dc2626", padding: "5px 15px", borderRadius: "5px" }}>Admin</Link>
            <Link to="/blog" style={{ color: "white", textDecoration: "none" }}>Blog</Link>
            <Link to="/volunteer" style={{ color: "white", textDecoration: "none" }}>Volunteer</Link>
            <Link to="/events" style={{ color: "white", textDecoration: "none" }}>Events</Link>
            <Link to="/faq" style={{ color: "white", textDecoration: "none" }}>FAQ</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/programs" element={<ProgramsUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/donate" element={<DonateUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App