import React, { useState, useContext } from 'react';
import { firestore } from 'Config/Firebase';
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { AuthenticatedContext } from 'Context/AuthenticatedContext';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';

const initialState = {
  fullName: "",
  CNIC: "",
  branchCode: "",
  accountNumber: "",
  accountType: "Saving", // Default value
  initialDeposit: "",
  date: "",
  time: "",
  userId: "",
  id: "",
  description: "Initial Amount"
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 90%;
  max-width: 600px;
`;

const Title = styled.h1`
  color: #4a148c;
  font-size: 32px;
  margin-bottom: 10px;
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: #6a1b9a;
  margin-bottom: 30px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #4a148c;
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s;
  width: 100%;
  
  &:hover {
    background-color: #6a1b9a;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #d1c4e9;
    cursor: not-allowed;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #4a148c;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #4a148c;
  border-radius: 8px;
  transition: border-color 0.3s;
  flex: 2;

  &:focus {
    border-color: #6a1b9a;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #4a148c;
  border-radius: 8px;
  transition: border-color 0.3s;
  flex: 2;

  &:focus {
    border-color: #6a1b9a;
    outline: none;
  }
`;

const Icon = styled.i`
  color: #6a1b9a;
  margin-right: 10px;
  font-size: 20px;
`;

const CreateAccounts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthenticatedContext);
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (state.fullName.trim() === "") {
      toast.error('Your Name field is empty; that is not acceptable.', {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }
    if (state.CNIC.length !== 13) {
      toast.error('CNIC length should be 13.', {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }
    if (state.branchCode > 99) {
      toast.error('You can use only 99 branches.', {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }
    if (state.accountNumber.length !== 9) {
      toast.error('Your Account number length should be 9.', {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }
    if (state.initialDeposit < 500) {
      toast.error('Your initial deposit is less than 500 PKR.', {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }

    // Start loading
    setIsLoading(true);
    state.date = dayjs().format('DD/MM/YYYY');
    state.time = dayjs().format('hh:mm:ss A');
    state.userId = user.uid;
    state.id = Math.random().toString(36).slice(2);

    const accountData = {
      ...state,
      createdBy: {
        email: user.email,
        uid: user.uid
      }
    };

    try {
      // Create account in Firestore
      await setDoc(doc(firestore, "accounts", state.id), accountData);
      // Notify user of success
      toast.success(`Dear ${accountData.fullName}, your account has been created against Account # ${accountData.accountNumber}`, {
        position: "top-right",
        autoClose: 5000,
      });

      // Prepare transaction data
      const transactionData = {
        amount: state.initialDeposit,
        description: state.description,
        dateCreated: serverTimestamp(),
        id: Math.random().toString(36).slice(2),
        accountId: state.id,
        type: 'credit',
        fullName: state.fullName,
        createdBy: {
          email: user.email,
          uid: user.uid
        }
      };

      // Create transaction in Firestore
      await setDoc(doc(firestore, "transactions", transactionData.id), transactionData);
      console.log("Transaction done", transactionData);

      // Navigate to view accounts after successful account creation
      navigate("/dashboard/viewAccounts");

    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('An error occurred while creating the account.', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      // Stop loading and reset state
      setIsLoading(false);
      setState(initialState);
    }
  };

  return (
    <Container className='createAccount'>
      <Card>
        <Title>Enter Account Details Below</Title>
        <SubTitle>All fields are required*</SubTitle>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Icon className="fa fa-user" />
            <Input type="text" name="fullName" value={state.fullName} placeholder="Enter full name" onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="CNIC">CNIC Number</Label>
            <Icon className="fa fa-id-card" />
            <Input type="number" name="CNIC" value={state.CNIC} placeholder="1234567890123" onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="branchCode">Branch Code</Label>
            <Icon className="fa fa-building" />
            <Input type="number" name="branchCode" value={state.branchCode} placeholder="1-99" onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Icon className="fa fa-user" />
            <Input type="number" name="accountNumber" value={state.accountNumber} placeholder="Account Number" onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="accountType">Account Type</Label>
            <Icon className="fa fa-circle-info" />
            <Select name="accountType" value={state.accountType} onChange={handleChange} required>
              <option value="Saving">Saving</option>
              <option value="Current">Current</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="initialDeposit">Initial Deposit</Label>
            <Icon className="fa fa-money-bill-wave" />
            <Input type="number" name="initialDeposit" value={state.initialDeposit} placeholder="1000" onChange={handleChange} required />
          </InputGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default CreateAccounts;
