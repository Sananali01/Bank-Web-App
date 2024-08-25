import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frontend from "./FrontEnd";
import Dashboard from './dashboard'; // Ensure this imports the Index component
import Login from "./Authentication/Login";
import SignUp from "./Authentication/Signup";
import ForgotPassword from './Authentication/ForgotPassword';
import NoPage from "./NoPage";
import PrivateRoute from './important/PrivateRoute';
import { AuthenticatedContext } from 'Context/AuthenticatedContext';
import About from './About';
import Services from './Services';
import Contact from './Contact';

function CustomRoutes() {
    const { isAuthenticated } = useContext(AuthenticatedContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Frontend />} />
                <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} /> {/* Ensure Dashboard is your Index */}
                <Route path='/about' element={<About />} />
                <Route path='/services' element={<Services />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default CustomRoutes;
