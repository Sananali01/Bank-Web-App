import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from 'Config/Firebase'; // Ensure this is your correct path to Firebase config
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faDollarSign, faBuilding, faCalendarAlt,  faPenFancy } from '@fortawesome/free-solid-svg-icons';

// Styled components for layout and design
const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: rgb(37, 117, 252); /* Indigo */
  text-align: center;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: rgb(37, 117, 252); /* Indigo */
  margin-right: 10px;
`;

const Value = styled.span`
  color: #333;
  flex-grow: 1;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #666;
`;

const NotFoundMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #f44336; /* Red */
`;

const AccountDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const docRef = doc(firestore, "accounts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAccount(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchAccountDetails();
  }, [id]);

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (!account) {
    return <NotFoundMessage>No account details found.</NotFoundMessage>;
  }

  return (
    <Container>
      <Title>Account Details</Title>
      <DetailItem>
        <FontAwesomeIcon icon={faIdCard} style={{ marginRight: '10px' }} />
        <Label>Account Number:</Label>
        <Value>{account.accountNumber}</Value>
      </DetailItem>
      <DetailItem>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
        <Label>Full Name:</Label>
        <Value>{account.fullName}</Value>
      </DetailItem>
      <DetailItem>
        <FontAwesomeIcon icon={faIdCard} style={{ marginRight: '10px' }} />
        <Label>CNIC:</Label>
        <Value>{account.CNIC}</Value>
      </DetailItem>
      <DetailItem>
        <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '10px' }} />
        <Label>Account Type:</Label>
        <Value>{account.accountType}</Value>
      </DetailItem>
      <DetailItem>
        <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: '10px' }} />
        <Label>Initial Deposit:</Label>
        <Value>{account.initialDeposit} PKR</Value>
      </DetailItem>
      <DetailItem>
        <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '10px' }} />
        <Label>Branch Code:</Label>
        <Value>{account.branchCode}</Value>
      </DetailItem>
      <DetailItem>
        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '10px' }} />
        <Label>Creation Date:</Label>
        <Value>{account.date} at {account.time}</Value>
      </DetailItem>
      <DetailItem>
        <FontAwesomeIcon icon={faPenFancy} style={{ marginRight: '10px' }} />
        <Label>Description:</Label>
        <Value>{account.description}</Value>
      </DetailItem>
      <DetailItem>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
        <Label>Created By:</Label>
        <Value>{account.createdBy?.email}</Value>
      </DetailItem>

      
    </Container>
  );
};

export default AccountDetails;
