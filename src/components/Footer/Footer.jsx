import React from 'react';
import { BsFacebook, BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  const footerStyle = {
    backgroundColor: '#2d3436', // Dark background for contrast
    color: '#ffffff', // White text for readability
    padding: '30px 0', // Increased padding for a more spacious look
    textAlign: 'center',
    fontSize: '1rem',
    position: 'relative',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)', // Shadow for depth
    overflow: 'hidden', // Prevent overflow from animations
  };

  const linkStyle = {
    color: '#2575fc', // Attractive link color
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease, transform 0.3s ease', // Added transform for scaling
  };

  const linkHoverStyle = {
    color: '#4686f5', // Darker green on hover
    transform: 'scale(1.1)', // Scale up on hover
  };

  const heartStyle = {
    color: '#e74c3c', // Red heart color
    animation: 'beat 1s infinite', // Heartbeat animation
  };

  const socialIconStyle = {
    color: '#ffffff',
    fontSize: '1.5rem',
    margin: '0 10px',
    transition: 'color 0.3s ease',
  };

  const keyframes = `
    @keyframes beat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
  `;

  return (
    <footer style={footerStyle}>
      <style>{keyframes}</style> {/* Insert keyframes into the component */}
      <div className="container-fluid" id='footer'>
        <div className="row">
          <div className="col">
            <p>
              &copy; {year} Bank. Made with <span style={heartStyle}>❤</span> by
              <a
                className='text-white fw-bold'
                target="_blank"
                rel="noopener noreferrer" // Security best practice
                style={{ textDecoration: "none", transition: 'color 0.3s ease' }}
                href="https://github.com/sananali01"
                onMouseOver={(e) => {
                  e.currentTarget.style.color = linkHoverStyle.color;
                  e.currentTarget.style.transform = linkHoverStyle.transform; // Apply scaling
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = linkStyle.color;
                  e.currentTarget.style.transform = 'scale(1)'; // Reset scaling
                }}
              >
                <span style={linkStyle}> Sanan Ali</span>
              </a>
            </p>
            <div className="social-icons">
              <a href="https://www.facebook.com/sananali53/" target="_blank" rel="noopener noreferrer" style={{ ...socialIconStyle }}>
                <BsFacebook />
              </a>
              <a href="https://github.com/sananali01" target="_blank" rel="noopener noreferrer" style={{ ...socialIconStyle }}>
                <BsGithub />
              </a>
              <a href="https://instagram.com/_exotic.sanan" target="_blank" rel="noopener noreferrer" style={{ ...socialIconStyle }}>
                <BsInstagram />
              </a>
              <a href="https://linkedin.com/in/sananali007" target="_blank" rel="noopener noreferrer" style={{ ...socialIconStyle }}>
                <BsLinkedin />
              </a>
            </div>
            <div style={{ marginTop: '10px' }}>
              <a href="/about" style={linkStyle}>About Us</a> |
              <a href="/services" style={{ ...linkStyle, margin: '0 10px' }}>Services</a> |
              <a href="/contact" style={linkStyle}>Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
