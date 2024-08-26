import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
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
  flex-wrap: wrap;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 80%;
  max-width: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h5`
  margin: 0;
  color: #6a11cb;
`;

const ModalBody = styled.div`
  margin-top: 15px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #444;

  &:hover {
    color: #6a11cb;
  }
`;

function ViewTransactions() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthenticatedContext);
  const [docId, setDocId] = useState("");
  const [transactionDetail, setTransactionDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (doc) => {
    setDocId(doc.id);
    setIsModalOpen(true); // Open modal on click
  };

  const readDocs = async () => {
    let array = [];
    const accountsRef = collection(firestore, "transactions");
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
  }, []);

  useEffect(() => {
    documents.forEach((doc) => {
      if (doc.id === docId) {
        setTransactionDetail(doc);
        return;
      }
    });
  }, [docId, documents]);

  return (
    <Container>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Rings color="#6a11cb" />
        </div>
      ) : (
        <Card>
          <Header>
            <Title><i className="fa fa-money-bill"></i> Transactions</Title>
            <Link to="/dashboard/createAccounts">
              <Button><i className="fa fa-plus"></i> Create Transaction</Button>
            </Link>
          </Header>
          {documents.length < 1 ? (
            <p className="text-center"><i className="fa fa-info-circle"></i> We don't have any Transactions yet!</p>
          ) : (
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th><i className="fa fa-tag"></i> Transaction ID</Th>
                    <Th><i className="fa fa-clock"></i> Time</Th>
                    <Th><i className="fa fa-calendar"></i> Date</Th>
                    <Th><i className="fa fa-id-card"></i> Account ID</Th>
                    <Th><i className="fa fa-exchange-alt"></i> Type</Th>
                    <Th><i className="fa fa-dollar-sign"></i> Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {documents.map((doc, index) => (
                    <Tr key={index}>
                      <Td>
                        <Button onClick={() => handleClick(doc)}>
                          {doc.id}
                        </Button>
                      </Td>
                      <Td>{doc.dateCreated.toDate().toLocaleTimeString('en-US')}</Td>
                      <Td>{doc.dateCreated.toDate().toDateString()}</Td>
                      <Td>{doc.accountId}</Td>
                      <Td>{doc.type}</Td>
                      <Td>{doc.amount}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>
          )}
        </Card>
      )}

      {/* Transaction Detail Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Transaction Details</ModalTitle>
              <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p><strong>Transaction ID:</strong> {transactionDetail.id}</p>
              <p><strong>Account ID:</strong> {transactionDetail.accountId}</p>
              <p><strong>Type:</strong> {transactionDetail.type}</p>
              <p><strong>Amount:</strong> {transactionDetail.amount}</p>
              <p><strong>Date:</strong> {transactionDetail?.dateCreated?.toDate()?.toDateString()}</p>
              <p><strong>Time:</strong> {transactionDetail?.dateCreated?.toDate()?.toLocaleTimeString('en-US')}</p>
              <p><strong>Description:</strong> {transactionDetail.description}</p>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default ViewTransactions;
