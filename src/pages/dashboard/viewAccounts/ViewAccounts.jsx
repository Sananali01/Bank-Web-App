import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore"; // Removed unused imports
import { firestore } from 'Config/Firebase';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Rings } from "react-loader-spinner";
import { AuthenticatedContext } from 'Context/AuthenticatedContext';
import 'font-awesome/css/font-awesome.min.css'; // Font Awesome import

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #444;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;

  &:hover {
    background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
  }

  i {
    margin-right: 8px;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Thead = styled.thead`
  background: #f0f0f0;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #e0e0e0;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  color: #555;
`;

const Td = styled.td`
  padding: 12px;
  text-align: left;
  color: #333;
`;

function ViewAccounts() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthenticatedContext);

  const readDocs = async () => {
    let array = [];
    const accountsRef = collection(firestore, "accounts");
    const q = query(accountsRef, where("createdBy.uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });
    setDocuments(array);
    setIsLoading(false);
  };

  useEffect(() => {
    readDocs();
  }, [readDocs]); // Added 'readDocs' as a dependency to avoid useEffect warning

  return (
    <Container>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Rings color="#6a11cb" />
        </div>
      ) : (
        <Card>
          <Header>
            <Title><i className="fa fa-users"></i> Accounts</Title>
            <Link to="/dashboard/createAccounts">
              <Button><i className="fa fa-plus"></i> Create Account</Button>
            </Link>
          </Header>
          {documents.length < 1 ? (
            <p className="text-center"><i className="fa fa-info-circle"></i> We don't have any Account yet!</p>
          ) : (
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th><i className="fa fa-code-branch"></i> Branch Code</Th>
                    <Th><i className="fa fa-hashtag"></i> Account #</Th>
                    <Th><i className="fa fa-user"></i> Name</Th>
                    <Th><i className="fa fa-calendar-alt"></i> Registered</Th>
                    <Th><i className="fa fa-id-card"></i> Type</Th>
                    <Th><i className="fa fa-money-bill"></i> Balance</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {documents.map((doc, i) => (
                    <Tr key={i}>
                      <Td>{doc.branchCode}</Td>
                      <Td>
                        <Button data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          {doc.accountNumber}
                        </Button>
                      </Td>
                      <Td>{doc.fullName}</Td>
                      <Td>{doc.date}</Td>
                      <Td>{doc.accountType}</Td>
                      <Td>{doc.initialDeposit}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>
          )}
        </Card>
      )}
    </Container>
  );
}

export default ViewAccounts;
