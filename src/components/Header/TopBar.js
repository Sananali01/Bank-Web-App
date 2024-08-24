import React, { useState, useEffect } from 'react';
import { BsFacebook, BsGithub, BsInstagram, BsTelephone } from "react-icons/bs";
import dayjs from 'dayjs';

function TopBar() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(dayjs().format("DD/MM/YYYY, hh:mm:ss A"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const timeStyle = {
        fontSize: '1.2rem',
        fontWeight: '500',
        letterSpacing: '0.5px',
        margin: 0,
        color: '#ffffff'
    };

    const iconStyle = {
        fontSize: '1.5rem',
        color: '#ffffff',
        marginLeft: '15px',
        transition: 'transform 0.3s ease',
    };

    const headerStyle = {
        background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
        padding: '10px 0',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap', // Allow wrapping on smaller screens
        padding: '0 15px', // Padding for mobile responsiveness
    };

    const contactStyle = {
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        fontSize: '1rem',
    };

    const phoneIconStyle = {
        marginRight: '10px',
        fontSize: '1.2rem',
    };

    const sloganStyle = {
        color: '#dfe6e9',
        fontSize: '1rem',
        fontStyle: 'italic',
    };

    // // Responsive styles
    // const responsiveStyles = {
    //     '@media (max-width: 768px)': {
    //         sloganStyle: {
    //             display: 'none', // Hide slogan on smaller screens
    //         },
    //         contactStyle: {
    //             flexDirection: 'column', // Stack items vertically
    //             alignItems: 'flex-start', // Align to start
    //             marginTop: '5px', // Space between elements
    //         },
    //         timeStyle: {
    //             fontSize: '1rem', // Adjust font size
    //         },
    //     },
    // };

    return (
        <header style={headerStyle}>
            <div style={containerStyle} className="container">
                <div>
                    <p style={timeStyle}>{time}</p>
                    <p style={sloganStyle}>Empowering Your Financial Future</p>
                </div>
                <div style={contactStyle}>
                    <BsTelephone style={phoneIconStyle} />
                    <span>Call Us: +123-456-7890</span>
                    <div style={{ display: 'flex', marginLeft: '20px' }}>
                        <a href="https://www.facebook.com/sananali53/" target="_blank" rel="noopener noreferrer">
                            <BsFacebook
                                style={iconStyle}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </a>
                        <a href="https://github.com/sananali01" target="_blank" rel="noopener noreferrer">
                            <BsGithub
                                style={iconStyle}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </a>
                        <a href="https://instagram.com/_exotic.sanan" target="_blank" rel="noopener noreferrer">
                            <BsInstagram
                                style={iconStyle}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default TopBar;
