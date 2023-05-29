/* eslint-disable react/jsx-key */
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Button from 'src/components/Button';
import ContentWrapper from 'src/components/ContentWrapper';
import StyledErrorRequest from 'src/components/ErrorRequest';
import Footer from 'src/components/footer';
import EditRequestForm from 'src/components/form/EditRequestForm';
import Icon from 'src/components/icons';
import Logo from 'src/components/Logo';
import { APILoader } from 'src/components/table/ApiLoader';
import Table from 'src/components/table/Table';
import styled from 'styled-components';

interface ManageRequestProps {
  className?: string;
}

const ManageRequest = ({ className }: ManageRequestProps) => {
  const TableWrapper = styled.div`
    margin: 45px;
    flex-grow: 1;
  `;
  const userId = 2;
  return (
    <div className={className}>
      <ContentWrapper>
        <Logo />
        <span>
          <Button primary href='/home'>
            Back
          </Button>
        </span>
        <h1>Manage Leave Requests</h1>
        <TableWrapper>
          <APILoader url={'http://localhost:1234/getRequestByUserId?userId=' + userId} Component={RequestsTable} />
        </TableWrapper>
        <Footer />
      </ContentWrapper>
    </div>
  );
};

function RequestsTable({ data }) {
  const [leave, setLeave] = useState(data.Data);
  const [isCreate, setIsCreate] = useState(false);
  const [requestType, setRequestType] = useState('');
  const [leaveId, setLeaveId] = useState('');

  const handleOpen = (requestType, leaveId) => {
    setRequestType(requestType);
    setLeaveId(leaveId);
    setIsCreate(true);
  };

  if (leave === null) {
    return <StyledErrorRequest />;
  }

  let leaveList = leave.sort((a, b) => {
    if (a.leaveID < b.leaveID) {
      return -1;
    }
    if (a.leaveID > b.leaveID) {
      return 1;
    }
    return 0;
  });

  const deleteUserCall = async (leaveID) => {
    return await fetch('http://localhost:1234/deleteRequest/' + leaveID, {
      method: 'DELETE',
    });
  };

  const deleteLeave = (leaveID) => {
    const array = [...leaveList];
    for (let i = 0; i < array.length; i++) {
      if (leaveID === array[i].userID) {
        let promise = deleteUserCall(leaveID);
        promise
          .then((response) => {
            if (!response.ok) {
              alert('Something went wrong');
              return;
            }
            alert('Delete Success');
            array.splice(i, 1);

            setLeave(array);
            return;
          })
          .catch((error) => {
            alert('Internal Server Error');
            return;
          });
      }
    }
    return;
  };
  return (
    <>
      <Table
        headers={['Request Type', 'Start Date', 'End Date', 'Status', 'Actions']}
        rows={leaveList.map((service) => [
          service.requestType,
          service.startDate,
          service.endDate,
          service.status,
          <div>
            <Button onClick={() => deleteLeave(service.leaveId)}>
              <Icon name='delete' />
            </Button>
            <Button onClick={() => handleOpen(service.requestType, service.leaveId)}>
              <Icon name='edit' />
            </Button>
          </div>,
        ])}
      />
      {isCreate && <EditRequestForm reqType={requestType} id={Number(leaveId)} close={() => setIsCreate(false)} />}
    </>
  );
}

const StyledManageRequest = styled(ManageRequest)`
  h1 {
    margin: 0;
    position: relative;
    top: 3rem;
    padding-bottom: 3rem;
    line-height: 1.15;
    font-size: 3.5rem;
    color: #fb6666;
    text-align: center;
  }

  span button {
    z-index: ${(props) => props.theme.zLayers.overlay};
    position: relative;
    top: 6.3rem;
  }

  table {
    max-height: 500px;
    svg {
      fill: black;
      width: 15px;
      height: 15px;
    }
  }
`;
export default StyledManageRequest;
