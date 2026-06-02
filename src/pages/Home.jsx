import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

function Home() {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  // Stats data
  const stats = [
    { value: 125, label: "Lives Impacted (K+)", suffix: "+" },
    { value: 48, label: "Active Programs", suffix: "" },
    { value: 22, label: "Meals Served (K+)", suffix: "+" },
    { value: 350, label: "Volunteers", suffix: "+" }
  ]

  // Programs data
  const programs = [
    {
      icon: "🎓",
      title: "Education",
      description: "Providing quality education to underprivileged children",
      color: "#3498db"
    },
    {
      icon: "🏥",
      title: "Healthcare",
      description: "Free medical camps and health awareness programs",
      color: "#2ecc71"
    },
    {
      icon: "🍲",
      title: "Food Drives",
      description: "Distributing nutritious meals to those in need",
      color: "#e67e22"
    },
    {
      icon: "👥",
      title: "Social Welfare",
      description: "Empowering communities through various initiatives",
      color: "#9b59b6"
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Volunteer",
      text: "Working with SRC Welfare Trust has been a life-changing experience. The team's dedication to helping others is truly inspiring.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Rajesh Kumar",
      role: "Donor",
      text: "I've seen firsthand how my donations are making a real difference in children's education. Transparent and trustworthy organization.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Dr. Meena Reddy",
      role: "Partner",
      text: "Their healthcare initiatives have reached thousands of people in need. A wonderful organization to partner with.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ]

  // Animated Counter Component
  const AnimatedCounter = ({ end, label, suffix }) => {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const counterRef = useRef(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      if (counterRef.current) observer.observe(counterRef.current)
      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      if (!isVisible) return

      let startTime = null
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / 2000, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [isVisible, end])

    return (
      <div ref={counterRef} style={{ textAlign: "center" }}>
        <div style={{ fontSize: "48px", fontWeight: "bold", color: "#e74c3c" }}>
          {count}{suffix}
        </div>
        <div style={{ fontSize: "16px", color: "#666", marginTop: "10px" }}>{label}</div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section with Animation */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated Background Circles */}
        <div style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          top: "-100px",
          right: "-100px",
          animation: "float 8s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          bottom: "-50px",
          left: "-50px",
          animation: "float 6s ease-in-out infinite reverse"
        }} />
        <div style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          top: "50%",
          right: "20%",
          animation: "float 10s ease-in-out infinite 2s"
        }} />

        <style>{`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .hero-animate {
            animation: fadeInUp 0.8s ease-out;
          }
          .pulse-animation {
            animation: pulse 2s infinite;
          }
        `}</style>

        <div className="hero-animate" style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center" }}>
            <div>
              <div style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                padding: "8px 20px",
                borderRadius: "50px",
                fontSize: "14px",
                marginBottom: "20px"
              }}>
                🎉 Making a Difference Since 2010
              </div>
              <h1 style={{ fontSize: "56px", fontWeight: "800", marginBottom: "20px", color: "white", lineHeight: "1.2" }}>
                Empowering Communities,<br />
                <span style={{ color: "#fbbf24" }}>Transforming Lives</span>
              </h1>
              <p style={{ fontSize: "18px", marginBottom: "30px", color: "rgba(255,255,255,0.9)", lineHeight: "1.6" }}>
                Join SRC Welfare Trust in creating lasting change through education, healthcare, 
                food drives, and social welfare programs. Together we can build a better tomorrow.
              </p>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <Link to="/donate">
                  <button style={{
                    background: "white",
                    color: "#764ba2",
                    padding: "14px 32px",
                    border: "none",
                    borderRadius: "50px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)"
                    e.target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "none"
                  }}>
                    Donate Now
                  </button>
                </Link>
                <Link to="/programs">
                  <button style={{
                    background: "transparent",
                    color: "white",
                    padding: "14px 32px",
                    border: "2px solid white",
                    borderRadius: "50px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "white"
                    e.target.style.color = "#764ba2"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent"
                    e.target.style.color = "white"
                  }}>
                    Our Programs
                  </button>
                </Link>
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🤝</div>
              <h3 style={{ color: "white", marginBottom: "15px" }}>Join Our Mission</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "20px" }}>
                Be part of something meaningful. Your support can change lives.
              </p>
              <Link to="/volunteer">
                <button style={{
                  background: "#fbbf24",
                  color: "#333",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}>
                  Become a Volunteer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Animated Counters */}
      <div ref={statsRef} style={{ backgroundColor: "#f8f9fa", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "36px", color: "#333", marginBottom: "15px" }}>Our Impact in Numbers</h2>
            <p style={{ fontSize: "18px", color: "#666" }}>Making a real difference in communities</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px"
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                transition: "transform 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <AnimatedCounter end={stat.value} label={stat.label} suffix={stat.suffix} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "36px", color: "#333", marginBottom: "15px" }}>Our Mission & Vision</h2>
          <p style={{ fontSize: "18px", color: "#666", maxWidth: "700px", margin: "0 auto" }}>
            Committed to creating a better world for everyone
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div style={{
            background: "linear-gradient(135deg, #667eea10, #764ba210)",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎯</div>
            <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#333" }}>Our Mission</h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              To empower underprivileged communities through education, healthcare, and social welfare programs, 
              creating sustainable opportunities for a better quality of life.
            </p>
          </div>
          <div style={{
            background: "linear-gradient(135deg, #667eea10, #764ba210)",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>👁️</div>
            <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#333" }}>Our Vision</h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              A world where every individual has access to quality education, healthcare, and equal opportunities 
              to lead a dignified and fulfilling life.
            </p>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div style={{ backgroundColor: "#f8f9fa", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "36px", color: "#333", marginBottom: "15px" }}>Our Programs</h2>
            <p style={{ fontSize: "18px", color: "#666" }}>Explore how we're making a difference</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px"
          }}>
            {programs.map((program, index) => (
              <div key={index} style={{
                backgroundColor: "white",
                padding: "40px 30px",
                borderRadius: "15px",
                textAlign: "center",
                transition: "all 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)"
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>{program.icon}</div>
                <h3 style={{ fontSize: "22px", marginBottom: "15px", color: "#333" }}>{program.title}</h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>{program.description}</p>
                <Link to="/programs">
                  <button style={{
                    marginTop: "20px",
                    background: "transparent",
                    color: program.color,
                    border: `2px solid ${program.color}`,
                    padding: "8px 20px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = program.color
                    e.target.style.color = "white"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent"
                    e.target.style.color = program.color
                  }}>
                    Learn More →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "36px", color: "#333", marginBottom: "15px" }}>What People Say</h2>
          <p style={{ fontSize: "18px", color: "#666" }}>Stories from our community</p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px"
        }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              border: "1px solid #eee"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <img src={testimonial.image} alt={testimonial.name} style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "15px"
                }} />
                <div>
                  <h4 style={{ margin: 0, color: "#333" }}>{testimonial.name}</h4>
                  <p style={{ margin: "5px 0 0", color: "#666", fontSize: "14px" }}>{testimonial.role}</p>
                </div>
              </div>
              <p style={{ color: "#666", lineHeight: "1.6", fontStyle: "italic" }}>"{testimonial.text}"</p>
              <div style={{ marginTop: "15px", color: "#f39c12" }}>
                {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "80px 20px",
        textAlign: "center",
        marginTop: "40px"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", color: "white", marginBottom: "20px" }}>Ready to Make a Difference?</h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.9)", marginBottom: "30px" }}>
            Join us in our mission to create lasting change. Every contribution matters.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/donate">
              <button style={{
                background: "white",
                color: "#764ba2",
                padding: "14px 32px",
                border: "none",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}>
                Donate Now
              </button>
            </Link>
            <Link to="/contact">
              <button style={{
                background: "transparent",
                color: "white",
                padding: "14px 32px",
                border: "2px solid white",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}>
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home