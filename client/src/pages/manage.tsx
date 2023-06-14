/* eslint-disable react/jsx-key */
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

  function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  const updateLeave = async (leaveId: number, startDate: Date, endDate: Date) => {
    let days = getBusinessDatesCount(startDate, endDate);

    const formData: any = new FormData();
    formData.append('leaveId', leaveId);
    formData.append('days', days);

    var requestOptions = {
      method: 'PUT',
      body: formData,
      redirect: 'follow' as RequestRedirect,
    };

    fetch('http://localhost:1234/updateHolidayDays?leaveId=' + leaveId + '&days=' + days, requestOptions)
      .then((response) => {
        deleteLeave(leaveId);
        response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => {
        alert('Oops! Something went wrong.');
      });
  };

  const deleteLeave = async (leaveId: number) => {
    const formData: any = new FormData();
    formData.append('leaveId', leaveId);

    var requestOptions = {
      method: 'DELETE',
      body: formData,
      redirect: 'follow' as RequestRedirect,
    };

    fetch('http://localhost:1234/deleteRequest?leaveId=' + leaveId, requestOptions)
      .then((response) => {
        alert('Delete Successful!');
        window.location.reload();
        response.text();
      })
      .then((result) => console.log(result))
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
            <Button onClick={() => updateLeave(service.leaveId, new Date(service.startDate.slice(0, 23)), new Date(service.endDate.slice(0, 23)))}>
              <Icon name='delete' />
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
