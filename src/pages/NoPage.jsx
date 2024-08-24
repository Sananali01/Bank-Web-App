import React from 'react';
import error from "../assets/error.jpg"

export default function NoPage() {
    const pageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#ffffff', // Light background
        color: '#2d3436', // Dark text for contrast
        textAlign: 'center',
        padding: '50px 20px',
    };

    const titleStyle = {
        fontSize: '6rem',
        fontWeight: 'bold',
        color: '#6a11cb', // Purple color for title
        animation: 'bounce 1s infinite',
    };

    const subtitleStyle = {
        fontSize: '2rem',
        margin: '20px 0',
        color: '#2575fc', // Blue color for subtitle
    };

    const paragraphStyle = {
        fontSize: '1.5rem',
        marginBottom: '30px',
        color: '#2d3436', // Dark text for contrast
    };

    const buttonStyle = {
        padding: '12px 24px',
        fontSize: '1.5rem',
        color: '#fff',
        backgroundColor: '#6a11cb', // Purple background for button
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        textDecoration: 'none',
        display: 'inline-block',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    };

    const buttonHoverStyle = {
        backgroundColor: '#5a0f9a', // Darker purple for hover effect
        transform: 'scale(1.05)', // Slightly increase size on hover
    };

    const imageStyle = {
        maxWidth: '500px',
        height: '300px',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={pageStyle}>
            <h1 style={titleStyle}>ERROR 404!</h1>
            <h2 style={subtitleStyle}>Page Not Found</h2>
            <p style={paragraphStyle}>
                Oops! The page you are looking for doesn't exist.
            </p>
            <a 
                href="/" 
                style={buttonStyle} 
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                    e.currentTarget.style.transform = buttonHoverStyle.transform;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                    e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                }}
            >
                Go Back Home
            </a>
            <div style={{ marginTop: '30px' }}>
                <img
                    src={error}
                    alt="Not Found"
                    style={imageStyle}
                />
            </div>
        </div>
    );
}
