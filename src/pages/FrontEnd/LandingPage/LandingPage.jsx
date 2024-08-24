import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import landingPageBg from '../../../assets/main.jpg'; // Background image for the main section
import featureImage1 from '../../../assets/feature1 (1).png'; // Image for feature 1
import featureImage2 from '../../../assets/feature1 (2).png'; // Image for feature 2

const LandingPageContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const MainSection = styled.div`
  background-image: url(${landingPageBg});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 80vh;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 40px;
  color: #fff;
`;

const TextContainer = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
`;

const LoginButton = styled.button`
  background-color: #ffffff;
  color: #000;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #eaeaea;
  }
`;

const FeatureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  padding: 20px;
`;

const FeatureHeading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #5b2e91;
  margin-bottom: 20px;
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  width: 90%;
  margin-bottom: 20px;
  text-align: left;
  padding: 20px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FeatureImage = styled.img`
  width: 40%;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const FeatureSubheading = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2575fc;
`;

const FeatureDescription = styled.p`
  font-size: 1.2rem;
`;

const ExtraContent = styled.div`
  text-align: center;
  margin-top: 40px;
  padding: 20px;
`;

const ExtraHeading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #2575fc;
  margin-bottom: 20px;
`;

const ExtraParagraph = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
`;

const ExploreButton = styled.button`
  background-color: #5b2e91; /* Purple color for the button */
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #4a1f74; /* Darker purple on hover */
  }
`;

const TestimonialSection = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  margin: 40px 0;
  text-align: center;
`;

const TestimonialHeading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #5b2e91; /* Match feature heading color */
  margin-bottom: 20px;
`;

const TestimonialSlider = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
`;

const TestimonialContent = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  will-change: transform;
`;

const Testimonial = styled.div`
  min-width: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin: 10px 0;
`;

const TestimonialAuthor = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #5b2e91;
  margin-top: 10px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #5b2e91;
  z-index: 10;

  &:hover {
    color: #4a1f74;
  }
`;

const PrevButton = styled(ArrowButton)`
  left: 10px;
`;

const NextButton = styled(ArrowButton)`
  right: 10px;
`;

const testimonialsData = [
  {
    text: "The best banking experience I have ever had! Their customer service is exceptional.",
    author: "John Doe",
  },
  {
    text: "I love the mobile app! It makes managing my finances so easy.",
    author: "Jane Smith",
  },
  {
    text: "With their business solutions, my company has grown significantly. Highly recommend!",
    author: "Michael Johnson",
  },
  {
    text: "Excellent customer support! They are always ready to help with any questions.",
    author: "Emily Davis",
  },
  {
    text: "The online banking features are top-notch. I can do everything from my phone!",
    author: "Sarah Wilson",
  },
  {
    text: "Great interest rates and even better service. I’m glad I switched!",
    author: "David Brown",
  },
  {
    text: "A fantastic experience overall! I’ve recommended this bank to all my friends.",
    author: "Anna Taylor",
  },
];

function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <LandingPageContainer>
      {/* Main Section */}
      <MainSection>
        <TextContainer>
          <Title>Unlock Exclusive Benefits!</Title>
          <Paragraph>
            Join us today and take advantage of our amazing offers! Experience seamless banking solutions tailored to your needs.
          </Paragraph>
          <ButtonLink to="/login">
            <LoginButton>Take Me to Login</LoginButton>
          </ButtonLink>
        </TextContainer>
      </MainSection>

      {/* Features Section */}
      <FeatureSection>
        <FeatureHeading>Our Unique Features</FeatureHeading>

        {/* Feature 1 */}
        <FeatureCard>
          <FeatureImage src={featureImage1} alt="Feature 1" />
          <div>
            <FeatureSubheading>Business Solutions</FeatureSubheading>
            <FeatureDescription>
              Unlock the potential of your business with tailored financial solutions that adapt to your growth.
              Our expert team offers personalized support, helping you navigate challenges and seize opportunities.
            </FeatureDescription>
          </div>
        </FeatureCard>

        {/* Feature 2 */}
        <FeatureCard>
          <div>
            <FeatureSubheading>Personal Banking</FeatureSubheading>
            <FeatureDescription>
              Manage your finances with our personalized banking solutions, tailored to fit your lifestyle.
              Enjoy easy access to your accounts, seamless online banking, and competitive interest rates.
            </FeatureDescription>
          </div>
          <FeatureImage src={featureImage2} alt="Feature 2" />
        </FeatureCard>
      </FeatureSection>

      {/* Extra Content Section */}
      <ExtraContent>
        <ExtraHeading>Explore Our Services</ExtraHeading>
        <ExtraParagraph>
          Discover a wide range of banking solutions designed for your needs.
        </ExtraParagraph>
        <Link to="/services">
          <ExploreButton>Explore Now</ExploreButton>
        </Link>
      </ExtraContent>

      {/* Testimonial Section */}
      <TestimonialSection>
        <TestimonialHeading>What Our Customers Say</TestimonialHeading>
        <TestimonialSlider>
          <PrevButton onClick={handlePrev}>&lt;</PrevButton>
          <TestimonialContent style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonialsData.map((testimonial, index) => (
              <Testimonial key={index}>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
              </Testimonial>
            ))}
          </TestimonialContent>
          <NextButton onClick={handleNext}>&gt;</NextButton>
        </TestimonialSlider>
      </TestimonialSection>
    </LandingPageContainer>
  );
}

export default LandingPage;
