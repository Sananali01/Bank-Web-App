import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from 'Config/Firebase';
import { AuthenticatedContext } from 'Context/AuthenticatedContext';
import { Rings } from 'react-loader-spinner';
import styled from 'styled-components';

// Define color scheme
const primaryColor = '#5C6BC0'; // Blue
const cardHoverColor = '#7E57C2'; // Darker Purple for hover effect
const textColor = '#ffffff'; // White text

const DashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
  max-width: 400px; /* Limit max width */
  margin: 10px; /* Add margin for spacing */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const CardBody = styled.div`
  padding: 20px;
  text-align: center;
`;

const CardTitle = styled.h5`
  color: ${primaryColor};
  font-size: 1.5rem;

  @media (max-width: 576px) {
    font-size: 1.25rem; /* Adjust font size for small screens */
  }
`;

const Button = styled(Link)`
  background-color: ${primaryColor};
  color: ${textColor};
  padding: 10px 20px;
  border-radius: 30px;
  text-decoration: none;
  margin: 5px;
  transition: background-color 0.3s;
  display: inline-block; /* Ensure buttons are inline-block for proper spacing */

  &:hover {
    background-color: ${cardHoverColor};
    color: ${textColor};
  }
`;

const Stats = styled.div`
  font-size: 2rem;
  margin-top: 20px;
  color: ${primaryColor};

  @media (max-width: 576px) {
    font-size: 1.5rem; /* Adjust font size for small screens */
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 576px) {
    flex-direction: column; /* Stack stats vertically on small screens */
    align-items: center;
  }
`;

const TotalCredits = styled.p`
  color: #4CAF50; /* Green */
`;

const TotalDebits = styled.p`
  color: #F44336; /* Red */
`;

function Dashboard() {
  const { user } = useContext(AuthenticatedContext);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const readDocs = async () => {
    let arrayAccounts = [];
    let arrayTransactions = [];

    // Fetch Accounts
    const accountsRef = collection(firestore, 'accounts');
    const qa = query(accountsRef, where('createdBy.uid', '==', user.uid));
    const querySnapshotAccounts = await getDocs(qa);

    // Fetch Transactions
    const transactionsRef = collection(firestore, 'transactions');
    const qt = query(transactionsRef, where('createdBy.uid', '==', user.uid));
    const querySnapshotTransactions = await getDocs(qt);

    querySnapshotAccounts.forEach((doc) => {
      arrayAccounts.push(doc.data());
    });

    let credit = 0;
    let debit = 0;
    querySnapshotTransactions.forEach((doc) => {
      arrayTransactions.push(doc.data());
      if (doc.data().type === 'credit') {
        credit += parseInt(doc.data().amount);
      } else {
        debit += parseInt(doc.data().amount);
      }
    });

    setTotalAccounts(arrayAccounts.length);
    setTotalTransactions(arrayTransactions.length);
    setTotalCredit(credit);
    setTotalDebit(debit);
    setIsLoading(false);
  };

  useEffect(() => {
    readDocs();
  }, []);

  return (
    <DashboardContainer>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <Card>
              <CardBody>
                <CardTitle><i className="fa-solid fa-user"></i> Accounts</CardTitle>
                <hr />
                <Button to="/dashboard/createAccounts"><i className="fa-solid fa-plus"></i> Add New Account</Button>
                <Button to="/dashboard/viewAccounts"><i className="fa-solid fa-eye"></i> View All Accounts</Button>
                <hr />
                {isLoading
                  ? <Rings />
                  : <Stats>{totalAccounts}</Stats>
                }
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-6">
            <Card>
              <CardBody>
                <CardTitle><i className="fa-solid fa-money-bill-1"></i> Transactions</CardTitle>
                <hr />
                <Button to="/dashboard/viewTransactions"><i className="fa-solid fa-eye"></i> View All Transactions</Button>
                <hr />
                {isLoading
                  ? <Rings />
                  : (
                    <div>
                      <Stats>{totalTransactions}</Stats>
                      <StatsContainer>
                        <TotalCredits>Total Credits: <span>{totalCredit}</span></TotalCredits>
                        <TotalDebits>Total Debits: <span>{totalDebit}</span></TotalDebits>
                      </StatsContainer>
                    </div>
                  )
                }
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default Dashboard;
