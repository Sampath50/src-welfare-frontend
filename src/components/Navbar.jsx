import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useState } from 'react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  window.addEventListener('scroll', () => {
    setIsScrolled(window.scrollY > 50)
  })

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: isScrolled ? 'rgba(31, 41, 55, 0.95)' : 'rgba(31, 41, 55, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img 
            src="/favicon.png" 
            alt="Logo" 
            style={{ 
              height: '45px', 
              width: '45px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
            }} 
          />
          <div>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px' }}>SRC</div>
            <div style={{ color: '#60a5fa', fontSize: '10px', letterSpacing: '1px' }}>WELFARE TRUST</div>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Home</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>About</Link>
          <Link to="/programs" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Programs</Link>
          <Link to="/gallery" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Gallery</Link>
          <Link to="/blog" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Blog</Link>
          <Link to="/events" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Events</Link>
          <Link to="/volunteer" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Volunteer</Link>
          <Link to="/faq" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>FAQ</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Contact</Link>
          <Link to="/donate" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            backgroundColor: '#2563eb', 
            padding: '8px 20px', 
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}>
            Donate
          </Link>
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}

export default Navbar