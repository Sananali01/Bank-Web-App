import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { auth } from '../../Config/Firebase';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { AuthenticatedContext } from '../../Context/AuthenticatedContext';
import { BsColumnsGap } from 'react-icons/bs';

function Navbar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticatedContext);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredLink, setHoveredLink] = useState('');

    const handleClick = () => {
        signOut(auth).then(() => {
            toast.success('User has been logged out!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsAuthenticated(false);
        }).catch((error) => {
            toast.error(error.message, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    const navStyle = {
        backgroundColor: '#2d3436',
        padding: '10px 0',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 15px',
        flexWrap: 'wrap', // Allow wrapping on smaller screens
    };

    const linkStyle = {
        color: '#ffffff',
        fontSize: '1rem',
        textDecoration: 'none',
        marginRight: '20px',
        transition: 'color 0.3s ease, background-color 0.3s ease',
        padding: '10px 15px',
        borderRadius: '5px',
    };

    const linkHoverStyle = {
        backgroundColor: '#2575fc',
        color: '#ffffff',
    };

    const buttonStyle = {
        textDecoration: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        border: 'none',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    };

    const loginButtonStyle = {
        ...buttonStyle,
        background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
        color: '#ffffff',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    };

    const loginButtonHoverStyle = {
        background: 'linear-gradient(45deg, #2575fc 0%, #6a11cb 100%)',
    };

    const logoutButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#e74c3c',
        color: '#ffffff',
    };

    const taglineStyle = {
        fontSize: '1rem',
        color: '#bdc3c7',
        fontStyle: 'italic',
        marginTop: '5px',
    };

    // // Responsive styles for small screens
    // const smallScreenStyle = {
    //     flexDirection: 'column', // Stack items on small screens
    //     alignItems: 'flex-start', // Align items to the start
    // };

    // const responsiveLinkStyle = {
    //     margin: '10px 0', // Spacing between links
    //     width: '100%', // Full width links
    //     textAlign: 'center', // Centered text
    // };

    return (
        <header>
            <nav style={navStyle}>
                <div style={containerStyle}>
                    <div>
                        <Link to="/" style={{ ...linkStyle, fontWeight: 'bold', fontSize: '1.5rem' }}>GLOBAL BANK</Link>
                        <p style={taglineStyle}>Your trusted partner in finance.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap',columnGap:"5px" }}>
                        {/* Additional Links with Hover Effects */}
                        <Link
                            to="/about"
                            style={{ ...linkStyle, backgroundColor: hoveredLink === 'about' ? linkHoverStyle.backgroundColor : 'transparent' }}
                            onMouseEnter={() => setHoveredLink('about')}
                            onMouseLeave={() => setHoveredLink('')}
                        >
                            About
                        </Link>
                        <Link
                            to="/services"
                            style={{ ...linkStyle, backgroundColor: hoveredLink === 'services' ? linkHoverStyle.backgroundColor : 'transparent' }}
                            onMouseEnter={() => setHoveredLink('services')}
                            onMouseLeave={() => setHoveredLink('')}
                        >
                            Services
                        </Link>
                        <Link
                            to="/contact"
                            style={{ ...linkStyle, backgroundColor: hoveredLink === 'contact' ? linkHoverStyle.backgroundColor : 'transparent' }}
                            onMouseEnter={() => setHoveredLink('contact')}
                            onMouseLeave={() => setHoveredLink('')}
                        >
                            Contact
                        </Link>

                        {/* Conditional rendering for login/logout */}
                        {!isAuthenticated
                            ? <Link
                                to="/login"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={isHovered ? { ...loginButtonStyle, ...loginButtonHoverStyle } : loginButtonStyle}>
                                Login
                              </Link>
                            : (
                                <>
                                    <Link to="/dashboard" style={loginButtonStyle}>Dashboard</Link>
                                    <button onClick={handleClick} style={logoutButtonStyle}>Logout</button>
                                </>
                            )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
