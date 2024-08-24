import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from "../assets/service (1).png"
import img2 from "../assets/service (2).png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCog, faDollarSign, faHome } from '@fortawesome/free-solid-svg-icons';

function Services() {
  const pageStyle = {
    backgroundColor: '#ffffff',
    color: '#2d3436',
    padding: '50px 20px',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#6a11cb',
    fontSize: '2.5rem',
    marginBottom: '20px',
  };

  const marqueeStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
    position: 'relative',
  };

  const marqueeContentStyle = {
    display: 'flex',
    animation: 'scroll 10s linear infinite', // Slow scrolling effect
  };

  const marqueeCardStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    margin: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    textAlign: 'left',
    transition: 'transform 0.3s, box-shadow 0.3s',
    flex: '1 1 calc(33.333% - 30px)', // Responsive flex for 3 columns
    display: 'flex',
    flexDirection: 'column',
  };


  const serviceCardStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    margin: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '330px', // Fixed height for uniformity
    width: '230px',  // Fixed width for uniformity
    textAlign: 'left',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Space between content
  };
  const serviceTitleStyle = {
    color: '#2575fc',
    fontSize: '1.5rem',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const serviceDescriptionStyle = {
    fontSize: '1rem',
    lineHeight: '1.4',
    marginTop: '10px',
    marginBottom: '10px',
  };

  const additionalSectionStyle = {
    marginTop: '50px',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const subheadingStyle = {
    color: '#6a11cb',
    fontSize: '2rem',
    marginTop: '40px',
    marginBottom: '15px',
  };

  const paragraphStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',

  };

  const imageStyle = {
    width: '100%',
    borderRadius: '10px',
   
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '0 auto',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  };


  

  return (
    <>
      <Header />
      <div style={pageStyle}>
        <h1 style={headingStyle}>Our Services</h1>

        {/* Marquee Effect for Service Cards */}
        <div style={marqueeStyle}>
          <div style={marqueeContentStyle}>
            {services.concat(services).map((service, index) => (
              <div
                style={marqueeCardStyle}
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h2 style={serviceTitleStyle}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
                  {service.title}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Services Section in Grid Format */}
        <div style={additionalSectionStyle}>
          <h2 style={subheadingStyle}>Explore Our Services</h2>
          <div style={gridStyle}>
            {services.map((service, index) => (
              <div
                style={serviceCardStyle}
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h3 style={serviceTitleStyle}>
                  <FontAwesomeIcon icon={faCog} style={{ marginRight: '10px' }} />
                  {service.title}
                </h3>
                <p style={serviceDescriptionStyle}>{service.description}</p>
                <ul style={{ textAlign: 'left', margin: '10px 0', paddingLeft: '20px' }}>
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Content Section */}
        <div style={additionalSectionStyle}>
          <h2 style={subheadingStyle}> <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />Why Choose Our Services?</h2>
          <p style={paragraphStyle}>
            Our commitment to excellence ensures that we deliver the best solutions tailored to your unique needs. With a team of dedicated professionals, we guide you every step of the way towards achieving your financial goals.
          </p>
          <img
            src={img1} // Replace with your image URL
            alt="Why Choose Us"
            style={imageStyle}
          />

          <h2 style={subheadingStyle}> <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '10px' }} /> Our Expertise</h2>
          <p style={paragraphStyle}>
            We specialize in various financial services, ensuring that you receive comprehensive support, from personal banking to investment services. Our expertise allows us to create strategies that align with your financial aspirations.
          </p>
          <img
            src={img2} // Replace with your image URL
            alt="Our Expertise"
            style={imageStyle}
          />
        </div>
      </div>
      <Footer />
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); // Adjusted for duplicated services
          }
        }
 @media (min-width: 600px) and (max-width: 789px) {

 ${gridStyle} {
   justify-content:center;
  }
}

        @media (max-width: 768px) {
          /* Responsive adjustments for mobile */
          ${gridStyle} {
            flex-direction: column; /* Stack vertically on small screens */
            align-items: center;
            justify-content:center;
          }
          ${serviceCardStyle} {
            flex: '1 1 100%'; /* Full width on small screens */
            max-width: 100%; /* Ensure it doesn't exceed screen width */
          }
        }
      `}</style>
    </>
  );
}

// List of services with descriptions and benefits
const services = [
  {
    title: 'Personal Banking',
    description: 'Tailored personal banking services to meet your needs.',
    benefits: [
      'Flexible savings accounts',
      'Personal loans',
      '24/7 customer support',
    ],
  },
  {
    title: 'Business Banking',
    description: 'Solutions designed to help you manage and grow your business efficiently.',
    benefits: [
      'Business loans',
      'Cash management solutions',
      'Dedicated business advisors',
    ],
  },
  {
    title: 'Investment Services',
    description: 'Maximize your wealth with expert investment strategies.',
    benefits: [
      'Personalized investment plans',
      'Access to market research',
      'Portfolio management',
    ],
  },
  {
    title: 'Mortgage Loans',
    description: 'Flexible mortgage solutions to secure your dream home.',
    benefits: [
      'Competitive interest rates',
      'Tailored mortgage options',
      'Quick approvals',
    ],
  },
  {
    title: 'Credit Cards',
    description: 'Variety of credit cards with rewards and cash back.',
    benefits: [
      'Low-interest rates',
      'Rewards programs',
      'No annual fees',
    ],
  },
  {
    title: 'Retirement Planning',
    description: 'Retirement accounts and strategies to secure your financial future.',
    benefits: [
      'IRA and 401(k) options',
      'Retirement savings plans',
      'Financial advisors',
    ],
  },
  {
    title: 'Wealth Management',
    description: 'Personalized advice and strategies for effective wealth management.',
    benefits: [
      'Tailored investment strategies',
      'Tax-efficient investing',
      'Estate planning',
    ],
  },
  {
    title: 'Insurance Services',
    description: 'Comprehensive insurance solutions to protect your assets.',
    benefits: [
      'Life and health insurance',
      'Home and auto insurance',
      'Business insurance solutions',
    ],
  },
  {
    title: 'Financial Advisory',
    description: 'Expert advice to help you navigate financial decisions.',
    benefits: [
      'Budgeting assistance',
      'Debt management',
      'Investment advice',
    ],
  },
  {
    title: 'Tax Services',
    description: 'Tax planning and preparation services to optimize your tax situation.',
    benefits: [
      'Individual and business tax services',
      'Tax advice and planning',
      'Maximizing deductions',
    ],
  },
];

export default Services;
