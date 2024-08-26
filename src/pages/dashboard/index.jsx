import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartPie, FaMoneyCheckAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import ViewTransactions from './viewTransactions';
import ViewAccounts from './viewAccounts';
import CreateAccounts from './accounts';
import AccountDetails from './accounts/AccountDetails';

// Main color variables
const primaryColor = 'rgb(37, 117, 252)'; // Indigo
const secondaryColor = '#E6E6FA'; // Lavender
const hoverColor = '#B0E0E6'; // Powder Blue

const Navbar = styled.nav`
  background-color: ${primaryColor}; /* Indigo background */
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap; /* Allow items to wrap */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; /* Align items to the left on small screens */
  }
`;

const NavbarBrand = styled(Link)`
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: ${hoverColor};
  }

  @media (max-width: 768px) {
    margin-bottom: 10px; /* Space between brand and nav items */
  }
`;

const NavbarCollapse = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%; /* Full width on small screens */
    justify-content: flex-start; /* Align to the start */
  }
`;

const NavbarNav = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically */
    width: 100%; /* Full width on small screens */
  }
`;

const NavItem = styled.li`
  margin-left: 30px;

  @media (max-width: 768px) {
    margin: 0; /* Remove margin on small screens */
    padding: 10px 0; /* Space between items */
  }
`;

const NavLink = styled(Link)`
  color: ${({ isActive }) => (isActive ? '#FFD700' : '#ffffff')}; /* Gold for active link */
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${hoverColor};
  }

  svg {
    margin-right: 8px;
    font-size: 1.2rem; /* Icon size */
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Smaller font size on small screens */
  }
`;

const ContentArea = styled.div`
  padding: 20px;
  background-color: ${secondaryColor}; /* Lavender background for content area */
  min-height: 80vh;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px; /* Limit width on large screens */
  margin: auto; /* Center content area */

  @media (max-width: 768px) {
    padding: 15px; /* Smaller padding on small screens */
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${primaryColor};
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Smaller title on small screens */
  }
`;

function Index() {
  const location = useLocation();

  return (
    <>
      <header className='header'>
        <Navbar>
          <NavbarBrand to="/">
            <FaHome /> &nbsp; Global Bank
          </NavbarBrand>
          <NavbarCollapse>
            <NavbarNav>
              <NavItem>
                <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
                  <FaChartPie /> Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dashboard/viewAccounts" isActive={location.pathname === '/dashboard/viewAccounts'}>
                  <FaUser /> Accounts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dashboard/viewTransactions" isActive={location.pathname === '/dashboard/viewTransactions'}>
                  <FaMoneyCheckAlt /> Transactions
                </NavLink>
              </NavItem>
            </NavbarNav>
          </NavbarCollapse>
        </Navbar>
      </header>

      <ContentArea>
        <Title>Welcome to Global Bank</Title>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="viewTransactions" element={<ViewTransactions />} />
          <Route path="createAccounts" element={<CreateAccounts />} />
          <Route path="viewAccounts" element={<ViewAccounts />} />
          <Route path="accountDetails/:id" element={<AccountDetails />} />
        </Routes>
      </ContentArea>
    </>
  );
}

export default Index;
