/* eslint-disable react/jsx-key */
import { useState } from 'react';
import Button from 'src/components/Button';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
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
  const userId = 1;
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
  const leave = data.Data;
  const [isCreate, setIsCreate] = useState(false);
  const [requestType, setRequestType] = useState('');
  const [leaveId, setLeaveId] = useState('');
  const [confirmation, setConfirmation] = useState({
    leaveId: '',
    startDate: new Date(),
    endDate: new Date(),
  });
  const [deleteRequest, setDeleteRequest] = useState(false);

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

  const deleteLeave = async (values) => {
    const formData = new FormData();
    formData.append('leaveId', values.leaveId);
    fetch('http://localhost:1234/deleteRequest', {
      method: 'DELETE',
      body: formData,
    })
      .then((response) => {
        alert('Delete Successful!');
        window.location.reload();
      })
      .catch((error) => {
        alert('Oops! Something went wrong.');
      });
  };
  return (
    <>
      <Table
        headers={['Request Type', 'Start Date', 'End Date', 'Status', 'Actions']}
        rows={leaveList.map((service) => [
          service.requestType,
          service.startDate.slice(0, 16),
          service.endDate.slice(0, 16),
          service.status,
          <div>
            <Button onClick={() => handleOpen(service.requestType, service.leaveId)}>
              <Icon name='edit' />
            </Button>
            <Button
              onClick={() => {
                setConfirmation({
                  leaveId: service.leaveId,
                  startDate: new Date(service.startDate.slice(0, 23)),
                  endDate: new Date(service.endDate.slice(0, 23)),
                });
                setDeleteRequest(true);
              }}
            >
              <Icon name='delete' />
            </Button>
          </div>,
        ])}
      />
      {isCreate && <EditRequestForm reqType={requestType} id={Number(leaveId)} close={() => setIsCreate(false)} />}
      {deleteRequest && (
        <ConfirmationDialog
          title='Confirm Action'
          message='Are you sure you want to deny this request?'
          confirm={() => deleteLeave(confirmation)}
          cancel={() => setDeleteRequest(false)}
        />
      )}
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
