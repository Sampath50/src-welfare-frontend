import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Complete blog posts data
  const blogPosts = {
    1: {
      id: 1,
      title: "Annual Charity Event Raises ₹5 Lakhs",
      date: "March 15, 2024",
      category: "Events",
      author: "Sampath",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      fullContent: `
        <p>Our annual fundraising event was a tremendous success, bringing together over 500 supporters from across the community. The event raised ₹5 lakhs, which will directly support our education programs for underprivileged children.</p>
        
        <h3>Event Highlights</h3>
        <ul>
          <li>500+ attendees including local dignitaries and community leaders</li>
          <li>Live cultural performances by local artists</li>
          <li>Silent auction with generous donations from local businesses</li>
          <li>Inspiring speeches from beneficiaries of our programs</li>
        </ul>
        
        <h3>How Your Support Helps</h3>
        <p>The funds raised will provide:</p>
        <ul>
          <li>School supplies for 200 students</li>
          <li>Scholarships for 50 deserving children</li>
          <li>New classroom equipment for 3 schools</li>
        </ul>
        
        <p>We thank all our donors, volunteers, and supporters for making this event a huge success!</p>
      `
    },
    2: {
      id: 2,
      title: "New Medical Camp in Rural Village",
      date: "March 10, 2024",
      category: "Healthcare",
      author: "Dr. Priya",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
      fullContent: `
        <p>Our medical team recently organized a free health checkup camp in a remote village, serving over 300 patients who otherwise have limited access to healthcare facilities.</p>
        
        <h3>Services Provided</h3>
        <ul>
          <li>General health checkups for 300+ patients</li>
          <li>Free medicines distributed worth ₹2 lakhs</li>
          <li>Dental and eye checkup camps</li>
          <li>Health awareness sessions on hygiene and nutrition</li>
        </ul>
        
        <h3>Impact on the Community</h3>
        <p>Many villagers received medical attention for the first time. Chronic conditions were identified and treatment initiated. Follow-up camps are being planned.</p>
        
        <h3>Special Thanks</h3>
        <p>We extend our gratitude to the team of 20 doctors and 30 volunteers who made this camp possible.</p>
      `
    },
    3: {
      id: 3,
      title: "100 Students Receive Scholarships",
      date: "March 5, 2024",
      category: "Education",
      author: "Rajesh",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
      fullContent: `
        <p>Thanks to our generous donors, 100 underprivileged students received scholarships to continue their education this academic year.</p>
        
        <h3>Scholarship Details</h3>
        <ul>
          <li>Each student received ₹10,000 towards their education</li>
          <li>Covering tuition fees, books, and school supplies</li>
          <li>Students from 15 different villages benefited</li>
        </ul>
        
        <h3>Success Stories</h3>
        <p>Many of these students are first-generation learners in their families. This scholarship will help them pursue their dreams and break the cycle of poverty.</p>
        
        <h3>Future Plans</h3>
        <p>We aim to support 200 students next year. Your continued support can make this possible.</p>
      `
    },
    4: {
      id: 4,
      title: "Winter Clothing Drive Success",
      date: "February 20, 2024",
      category: "Community",
      author: "Meera",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=800",
      fullContent: `
        <p>This winter, our team successfully distributed over 1000 warm clothes to families in need across 10 villages. The harsh winter conditions made this initiative crucial for many underprivileged families who couldn't afford proper winter clothing.</p>
        
        <h3>Distribution Details</h3>
        <ul>
          <li>1000+ warm clothes including jackets, sweaters, blankets, and woolen caps</li>
          <li>10 villages covered in remote areas</li>
          <li>500+ families benefited from the drive</li>
          <li>Special focus on elderly people and young children</li>
        </ul>
        
        <h3>Community Response</h3>
        <p>The joy on the faces of the recipients was overwhelming. Many elderly people expressed their gratitude, saying this was the first time they received such help during winter.</p>
        
        <h3>Volunteer Participation</h3>
        <p>Over 50 volunteers helped in collecting, sorting, and distributing the clothes. Local businesses also contributed by donating new blankets and jackets.</p>
        
        <h3>Next Steps</h3>
        <p>We plan to make this an annual event and aim to reach 2000+ families next winter. Your donations and support can help us achieve this goal.</p>
      `
    },
    5: {
      id: 5,
      title: "Women Empowerment Workshop",
      date: "February 15, 2024",
      category: "Women Empowerment",
      author: "Lakshmi",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
      fullContent: `
        <p>Our 5-day Women Empowerment Workshop was a resounding success, training 50 women in tailoring and small business management skills. The workshop aimed to provide sustainable livelihood opportunities for women from economically weaker sections.</p>
        
        <h3>Workshop Modules</h3>
        <ul>
          <li>Tailoring and embroidery techniques (basic to advanced)</li>
          <li>Small business management and accounting</li>
          <li>Marketing and customer relations</li>
          <li>Financial literacy and savings</li>
          <li>Leadership and confidence building</li>
        </ul>
        
        <h3>Trainers and Mentors</h3>
        <p>We had 5 expert trainers from the field of textile design and 3 business mentors who guided the participants on how to start their own small tailoring businesses.</p>
        
        <h3>Success Stories</h3>
        <p>Already, 15 women have started their own small tailoring businesses from their homes. 20 more have formed a cooperative to take bulk orders from local businesses.</p>
        
        <h3>Equipment Provided</h3>
        <p>Each participant received a sewing machine and a starter kit of tailoring supplies to help them begin their journey.</p>
        
        <h3>Future Plans</h3>
        <p>We plan to conduct advanced workshops and help these women connect with larger markets. We also aim to train 200 more women in the next year.</p>
      `
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setPost(blogPosts[id])
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (!post) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Post not found</h2>
        <Link to="/blog">Back to Blog</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "100px 20px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{ 
            backgroundColor: "#e74c3c", 
            padding: "5px 15px", 
            borderRadius: "20px",
            fontSize: "14px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            {post.category}
          </span>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>{post.title}</h1>
          <p>
            By {post.author} • {post.date} • {post.readTime}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ 
          backgroundColor: "white", 
          padding: "40px", 
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
          
          <div style={{ 
            marginTop: "40px", 
            paddingTop: "20px", 
            borderTop: "1px solid #eee",
            textAlign: "center"
          }}>
            <Link to="/blog" style={{
              backgroundColor: "#e74c3c",
              color: "white",
              padding: "12px 30px",
              textDecoration: "none",
              borderRadius: "30px",
              display: "inline-block"
            }}>
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost