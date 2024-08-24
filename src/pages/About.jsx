import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBullseye, faLightbulb, faHandshake, faGlobe, faRocket, faChartLine } from '@fortawesome/free-solid-svg-icons';
// Import team member images
import teamMember1 from '../assets/team/goku.jpg';
import teamMember2 from '../assets/team/naruto.png';
import teamMember3 from '../assets/team/luffy.jpg';
import teamMember4 from '../assets/team/ichigo.jpg';
import teamMember5 from '../assets/team/edward.jpg';
import teamMember6 from '../assets/team/natsu.jpg';
import about from '../assets/sa.png';

function About() {
    const [countries, setCountries] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [assets, setAssets] = useState(0);

    useEffect(() => {
        animateValue(setCountries, 0, 50, 2000);
        animateValue(setCustomers, 0, 1000000, 2500);
        animateValue(setAssets, 0, 100000000000, 3000);
    }, []);

    const animateValue = (setter, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setter(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const formatNumber = (number) => {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1) + 'B'; // Billion
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M'; // Million
        } else if (number >= 1e5) {
            return (number / 1e5).toFixed(1) + 'L'; // Lakh
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K'; // Thousand
        }
        return number; // Less than 1000
    };

    const pageStyle = {
        backgroundColor: '#ffffff',
        color: '#2d3436',
        padding: '50px 20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    };

    const headingStyle = {
        color: '#6a11cb',
        fontSize: '3rem',
        marginBottom: '20px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '2px',
    };

    const subheadingStyle = {
        color: '#2575fc',
        fontSize: '2.5rem',
        marginBottom: '20px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
    };

    const paragraphStyle = {
        fontSize: '1.2rem',
        lineHeight: '1.8',
        margin: '20px auto',
        maxWidth: '900px',
        textAlign: 'center',
    };

    const sectionStyle = {
        marginBottom: '1px',
    };

    const imageContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
    };


    const highlightStyle = {
        color: '#e74c3c',
        fontWeight: 'bold',
    };

    const valueStyle = {
        backgroundColor: '#2e2e2e',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px',
        maxWidth: '900px',
        margin: '20px auto',
    };

    const valueHeadingStyle = {
        fontSize: '2rem',
        color: '#6a11cb',
        marginBottom: '15px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
    };

    const valueTextStyle = {
        color: "white",
        fontSize: '1.1rem',
        lineHeight: '1.6',
        textAlign: 'center',
    };

    const teamStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '40px',
        justifyContent: 'center',
        marginTop: '40px',
        textAlign: 'center',
    };

    const teamMemberStyle = {
        maxWidth: '200px',
        margin: '0 auto',
    };

    const teamImageStyle = {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        objectFit: 'cover',
    };

    const teamNameStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2d3436',
    };

    const teamRoleStyle = {
        fontSize: '1.2rem',
        color: '#2575fc',
    };

    const iconStyle = {
        marginRight: '10px',
        color: '#6a11cb',
    };

    const statsStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '50px',
        marginBottom: '50px',
    };

    const statBlockStyle = {
        textAlign: 'center',
        maxWidth: '250px',
    };

    const statNumberStyle = {
        fontSize: '2rem',
        color: '#6a11cb',
        marginBottom: '10px',
    };

    const statLabelStyle = {
        fontSize: '1.2rem',
        color: '#2d3436',
    };

    return (
        <>
            <Header />

            <div style={pageStyle}>
                {/* Introduction Section */}
                <section style={sectionStyle}>
                    <h1 style={headingStyle}>About Us</h1>
                    <p style={paragraphStyle}>
                        <FontAwesomeIcon icon={faUsers} style={iconStyle} />
                        Welcome to <span style={highlightStyle}>Global Bank</span>! We are a leading financial institution committed to providing
                        exceptional banking services and innovative financial solutions. Our mission is to empower
                        individuals and businesses by offering tailored products that meet their financial needs.
                    </p>
                </section>

                {/* Team Section */}
                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>Meet Our Team</h2>
                    <div style={teamStyle}>
                        <div style={teamMemberStyle}>
                            <img
                                src={teamMember1}
                                alt="Goku"
                                style={teamImageStyle}
                            />
                            <p style={teamNameStyle}>Goku</p>
                            <p style={teamRoleStyle}>CEO</p>
                        </div>
                        <div style={teamMemberStyle}>
                            <img
                                src={teamMember2}
                                alt="Naruto"
                                style={teamImageStyle}
                            />
                            <p style={teamNameStyle}>Naruto</p>
                            <p style={teamRoleStyle}>CFO</p>
                        </div>
                        <div style={teamMemberStyle}>
                            <img
                                src={teamMember3}
                                alt="Luffy"
                                style={teamImageStyle}
                            />
                            <p style={teamNameStyle}>Luffy</p>
                            <p style={teamRoleStyle}>CTO</p>
                        </div>
                        <div style={teamMemberStyle}>
                            <img
                                src={teamMember4}
                                alt="Ichigo"
                                style={teamImageStyle}
                            />
                            <p style={teamNameStyle}>Ichigo</p>
                            <p style={teamRoleStyle}>COO</p>
                        </div>
                        <div style={teamMemberStyle}>
                            <img
                                src={teamMember5}
                                alt="Edward"
                                style={teamImageStyle}
                            />
                            <p style={teamNameStyle}>Edward</p>
                            <p style={teamRoleStyle}>CMO</p>
                        </div>
                        <div style={teamMemberStyle}>
                            <img
                                src={teamMember6}
                                alt="Natsu"
                                style={teamImageStyle}
                            />
                            <p style={teamNameStyle}>Natsu</p>
                            <p style={teamRoleStyle}>CHRO</p>
                        </div>
                    </div>
                </section>

                {/* Customer Success Stories Section */}
                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>
                        <FontAwesomeIcon icon={faChartLine} style={iconStyle} />
                        Customer Success Stories
                    </h2>
                    <p style={paragraphStyle}>
                        Our clients' success is our greatest achievement. Discover how Global Bank has helped individuals and businesses
                        reach new heights through our dedicated support and tailored financial solutions.
                    </p>
                </section>

                {/* Stats Section */}
                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>Our Impact</h2>
                    <div style={statsStyle}>
                        <div style={statBlockStyle}>
                            <div style={statNumberStyle}>{formatNumber(countries)}</div>
                            <div style={statLabelStyle}>Countries</div>
                        </div>
                        <div style={statBlockStyle}>
                            <div style={statNumberStyle}>{formatNumber(customers)}</div>
                            <div style={statLabelStyle}>Customers</div>
                        </div>
                        <div style={statBlockStyle}>
                            <div style={statNumberStyle}>{formatNumber(assets)}</div>
                            <div style={statLabelStyle}>Total Assets</div>
                        </div>
                    </div>
                </section>
                {/* Mission Section */}
                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>
                        <FontAwesomeIcon icon={faBullseye} style={iconStyle} />
                        Our Mission
                    </h2>
                    <p style={paragraphStyle}>
                        At Global Bank, our mission is to build lasting relationships with our customers by providing
                        high-quality, reliable, and accessible financial services. We are dedicated to helping our clients
                        achieve their financial goals and secure a bright future.
                    </p>
                    <div style={imageContainerStyle}>
        <img
            src={about}
            alt="Our Mission"
   
             className="about-image"
        />
    </div>
                </section>

                {/* Values Section */}
                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>Our Core Values</h2>
                    <div style={valueStyle}>
                        <h3 style={valueHeadingStyle}>
                            <FontAwesomeIcon icon={faLightbulb} style={iconStyle} />
                            Integrity
                        </h3>
                        <p style={valueTextStyle}>
                            We operate with the highest standards of ethics, transparency, and responsibility. Our commitment
                            to integrity ensures that we earn and maintain the trust of our clients and stakeholders.
                        </p>
                    </div>
                    <div style={valueStyle}>
                        <h3 style={valueHeadingStyle}>
                            <FontAwesomeIcon icon={faHandshake} style={iconStyle} />
                            Innovation
                        </h3>
                        <p style={valueTextStyle}>
                            At Global Bank, we are constantly seeking new ways to improve our services and provide cutting-edge
                            solutions that meet the evolving needs of our clients.
                        </p>
                    </div>
                    <div style={valueStyle}>
                        <h3 style={valueHeadingStyle}>
                            <FontAwesomeIcon icon={faUsers} style={iconStyle} />
                            Customer Focus
                        </h3>
                        <p style={valueTextStyle}>
                            Our customers are at the heart of everything we do. We are dedicated to providing personalized
                            service and support to help our clients achieve their financial dreams.
                        </p>
                    </div>
                </section>

                {/* Global Presence Section */}
                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>
                        <FontAwesomeIcon icon={faGlobe} style={iconStyle} />
                        Our Global Presence
                    </h2>
                    <p style={paragraphStyle}>
                        Global Bank operates in over 50 countries, serving millions of customers worldwide. Our extensive network
                        ensures that we can provide top-notch financial services wherever our clients need them.
                    </p>
                </section>

                {/* Innovation & Technology Section */}
                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>
                        <FontAwesomeIcon icon={faRocket} style={iconStyle} />
                        Innovation & Technology
                    </h2>
                    <p style={paragraphStyle}>
                        We leverage the latest technologies to offer innovative financial solutions that keep pace with the fast-changing
                        world. From mobile banking to AI-driven investment advice, Global Bank is at the forefront of fintech.
                    </p>
                </section>

            </div>

            <Footer />
        </>
    );
}

export default About;
