import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faBuilding, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState({ name: false, email: false, message: false, phone: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const pageStyle = {
    backgroundColor: '#ffffff',
    color: '#333',
    padding: '60px 20px',
    textAlign: 'center',
  };

  const headingStyle = {
    color: 'rgb(37, 117, 252)',
    fontSize: '3rem',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    margin: '20px auto',
    maxWidth: '800px',
    color: '#666',
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const inputContainerStyle = {
    position: 'relative',
    marginBottom: '20px',
  };

  const inputIconStyle = {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px 12px 40px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#6a11cb',
    boxShadow: '0 0 5px rgba(106, 17, 203, 0.5)',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '150px',
    resize: 'none',
  };

  const buttonStyle = {
    backgroundColor: '#6a11cb',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    width: '100%',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2575fc',
  };

  const successMessageStyle = {
    color: '#27ae60',
    fontSize: '1.2rem',
    marginTop: '20px',
  };

  const contactInfoStyle = {
    margin: '40px auto',
    textAlign: 'left',
    maxWidth: '600px',
  };

  const contactInfoItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '1.1rem',
  };

  const contactIconStyle = {
    color: '#2575fc',
    marginRight: '15px',
    fontSize: '1.5rem',
  };

  return (
    <>
      <Header />
      <div style={pageStyle}>
        <h1 style={headingStyle}>Contact Us</h1>
        <p style={paragraphStyle}>
          We would love to hear from you! Whether you have a question about our services, need assistance, 
          or just want to provide feedback, our team is here to help.
        </p>

        <div style={contactInfoStyle}>
          <div style={contactInfoItemStyle}>
            <FontAwesomeIcon icon={faPhone} style={contactIconStyle} />
            <span>Phone: +1 (555) 123-4567</span>
          </div>
          <div style={contactInfoItemStyle}>
            <FontAwesomeIcon icon={faEnvelope} style={contactIconStyle} />
            <span>Email: support@globalbank.com</span>
          </div>
          <div style={contactInfoItemStyle}>
            <FontAwesomeIcon icon={faBuilding} style={contactIconStyle} />
            <span>Address: 123 Bank Street, Financial District, NY</span>
          </div>
        </div>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputContainerStyle}>
            <FontAwesomeIcon icon={faUser} style={inputIconStyle} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...inputStyle,
                ...(isFocused.name ? inputFocusStyle : {}),
              }}
              onFocus={() => setIsFocused({ ...isFocused, name: true })}
              onBlur={() => setIsFocused({ ...isFocused, name: false })}
            />
          </div>
          <div style={inputContainerStyle}>
            <FontAwesomeIcon icon={faEnvelope} style={inputIconStyle} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...inputStyle,
                ...(isFocused.email ? inputFocusStyle : {}),
              }}
              onFocus={() => setIsFocused({ ...isFocused, email: true })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
            />
          </div>
          <div style={inputContainerStyle}>
            <FontAwesomeIcon icon={faPhone} style={inputIconStyle} />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={{
                ...inputStyle,
                ...(isFocused.phone ? inputFocusStyle : {}),
              }}
              onFocus={() => setIsFocused({ ...isFocused, phone: true })}
              onBlur={() => setIsFocused({ ...isFocused, phone: false })}
            />
          </div>
          <div style={inputContainerStyle}>
            <FontAwesomeIcon icon={faCommentDots} style={inputIconStyle} />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              style={{
                ...textareaStyle,
                ...(isFocused.message ? inputFocusStyle : {}),
              }}
              onFocus={() => setIsFocused({ ...isFocused, message: true })}
              onBlur={() => setIsFocused({ ...isFocused, message: false })}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Send Message
          </button>
        </form>
        {formSubmitted && (
          <p style={successMessageStyle}>Thank you! Your message has been sent successfully.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Contact;
