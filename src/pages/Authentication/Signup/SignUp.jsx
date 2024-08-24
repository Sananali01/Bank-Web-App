import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Config/Firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticatedContext } from '../../../Context/AuthenticatedContext';

const initialState = { email: "", password: "", confirmPassword: "" };

function SignUp() {
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const [state, setState] = useState(initialState);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password, confirmPassword } = state;

    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Use userCredential if needed
          toast.success('User has been Registered Successfully!', {
            position: "bottom-left",
            autoClose: 5000,
          });
          setIsAuthenticated(true);
          navigate("/dashboard/viewAccounts");
        })
        .catch((error) => {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
      toast.error('Please Correct your Confirmation Password!', {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  }

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
    position: 'relative',
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
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="exampleInputEmail1" style={labelStyle}>Email</label>
          <input 
            type="email" 
            style={inputStyle} 
            id="exampleInputEmail1" 
            placeholder="Email" 
            name='email' 
            required 
            onChange={handleChange} 
          />

          <label htmlFor="password" style={labelStyle}>Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={isPasswordShow ? "text" : "password"} 
              style={inputStyle} 
              id="password" 
              placeholder="Password" 
              name='password' 
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
              <i className={`fa-solid fa-eye${isPasswordShow ? "" : "-slash"}`}></i>
            </button>
          </div>

          <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={isConfirmPasswordShow ? "text" : "password"} 
              style={inputStyle} 
              id="confirmPassword" 
              placeholder="Confirm Password" 
              name='confirmPassword' 
              required 
              onChange={handleChange} 
            />
            <button 
              type='button' 
              onClick={() => setIsConfirmPasswordShow(!isConfirmPasswordShow)} 
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
              <i className={`fa-solid fa-eye${isConfirmPasswordShow ? "" : "-slash"}`}></i>
            </button>
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              disabled={isLoading} 
              style={buttonStyle}
            >
              {!isLoading ? "Sign Up" : <div className='spinner-border spinner-border-sm'></div>}
            </button>
          </div>
        </form>

        <div style={{ position: "relative", margin: '20px 0' }}>
          <span className='OR' style={{ color: '#4b0082', fontWeight: 'bold' }}>OR</span>
          <hr />
        </div>

        <div className='text-center'>
          Already a user? <Link to="/login" style={{ color: '#4b0082' }}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
