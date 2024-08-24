import React, { useState, useEffect, useContext } from 'react';
import { AuthenticatedContext } from '../../../Context/AuthenticatedContext';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provider, facebookProvider, githubProvider } from '../../../Config/Firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const initialState = { email: "", password: "" };

function Login() {
    const [state, setState] = useState(initialState);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated, setUserId } = useContext(AuthenticatedContext);
    const navigate = useNavigate();

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            }
        });
    }, [setUserId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;

        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success('User has been logged In!', {
                    position: "bottom-left",
                    autoClose: 5000,
                });
                setIsAuthenticated(true);
                navigate("/dashboard");
            })
            .catch(() => {
                toast.error("Password/email incorrect", {
                    position: "bottom-left",
                    autoClose: 5000,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleGoogleAuthentication = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then(() => {
                toast.success("User has been logged in!", {
                    position: "top-right",
                    autoClose: 5000,
                });
                navigate("/dashboard");
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                });
            });
    };

    const handleFacebookAuthentication = () => {
        signInWithPopup(auth, facebookProvider)
            .then(() => {
                toast.success("User has been logged in!", {
                    position: "top-right",
                    autoClose: 5000,
                });
                navigate("/dashboard");
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                });
            });
    };

    const handleGithubAuthentication = () => {
        signInWithPopup(auth, githubProvider)
            .then(() => {
                toast.success("User has been logged in!", {
                    position: "top-right",
                    autoClose: 5000,
                });
                navigate("/dashboard");
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                });
            });
    };

    // Styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        padding: '20px',
    };

    const cardStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        position: 'relative', // Added to position the back button correctly
    };

    const titleStyle = {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#4b0082',
    };

    const labelStyle = {
        fontWeight: 'bold',
        margin: '10px 0 5px',
        color: '#4b0082',
    };

    const inputStyle = {
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        width: '100%',
        marginBottom: '20px',
        fontSize: '1rem',
    };

    const buttonStyle = {
        backgroundColor: '#4b0082',
        color: '#fff',
        padding: '12px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
    };

    // const buttonHoverStyle = {
    //     backgroundColor: '#3b0072',
    // };

    const iconButtonStyle = {
        cursor: 'pointer',
        fontSize: '1.5rem',
        margin: '0 10px',
        color: '#4b0082',
    };

    const backButtonStyle = {
        position: 'absolute',
        top: '1px',
        left: '20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#ffffff',
        fontSize: '1.5rem',
    };

    return (
        <div style={containerStyle}>
            <Link to="/" style={backButtonStyle}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div style={cardStyle}>
                <h3 style={titleStyle}>LOGIN</h3>
                <form onSubmit={handleSubmit}>
                    <label style={labelStyle} htmlFor="exampleInputEmail1">Email</label>
                    <input 
                        type="email" 
                        style={inputStyle} 
                        id="exampleInputEmail1" 
                        placeholder="Email" 
                        name='email' 
                        required 
                        onChange={handleChange} 
                    />

                    <label style={labelStyle} htmlFor="password">Password</label>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type={isPasswordShow ? "text" : "password"} 
                            style={inputStyle} 
                            id="password" 
                            name='password' 
                            placeholder="Password" 
                            required 
                            onChange={handleChange} 
                        />
                        <button 
                            type='button' 
                            onClick={() => setIsPasswordShow(!isPasswordShow)} 
                            style={{ 
                                position: 'absolute', 
                                right: '10px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                background: 'none', 
                                border: 'none', 
                                color: '#4b0082', 
                                cursor: 'pointer' 
                            }}>
                            <FontAwesomeIcon icon={isPasswordShow ? faEye : faEyeSlash} />
                        </button>
                    </div>

                    <div className="text-center">
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            style={buttonStyle}
                        >
                            {!isLoading ? "Login" : <div className='spinner-border spinner-border-sm'></div>}
                        </button>
                    </div>
                    <div className="text-end mt-3">
                        <Link to="/forgotPassword" style={{ color: '#4b0082' }}>Forgot Password?</Link>
                    </div>
                </form>

                <div style={{ position: "relative", margin: '20px 0' }}>
                    <span className='OR' style={{ color: '#4b0082', fontWeight: 'bold' }}>OR</span>
                    <hr />
                </div>

                <div className="text-center">
                    <i className="btn fa-brands fa-google" style={iconButtonStyle} onClick={handleGoogleAuthentication}></i>
                    <i className="btn fa-brands fa-facebook-f mx-3" style={iconButtonStyle} onClick={handleFacebookAuthentication}></i>
                    <i className="btn fa-brands fa-github" style={iconButtonStyle} onClick={handleGithubAuthentication}></i>
                </div>

                <div className='text-center'>
                    Need an account? <Link to="/signUp" style={{ color: '#4b0082' }}>SIGNUP</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
