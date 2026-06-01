import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/favicon.png" alt="Logo" style={{ height: '40px', borderRadius: '10px' }} />
          <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937' }}>SRC Welfare Trust</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link to="/about" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>About</Link>
          <Link to="/programs" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Programs</Link>
          <Link to="/gallery" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Gallery</Link>
          <Link to="/blog" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Blog</Link>
          <Link to="/events" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Events</Link>
          <Link to="/volunteer" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Volunteer</Link>
          <Link to="/faq" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>FAQ</Link>
          <Link to="/contact" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '14px' }}>Contact</Link>
          <Link to="/donate" style={{ backgroundColor: '#dc2626', color: 'white', padding: '8px 20px', borderRadius: '30px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Donate</Link>
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}

export default Navbar