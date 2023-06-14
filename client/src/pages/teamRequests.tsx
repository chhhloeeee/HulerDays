/* eslint-disable react/jsx-key */
import { useState } from 'react';
import Button from 'src/components/Button';
import ContentWrapper from 'src/components/ContentWrapper';
import StyledErrorRequest from 'src/components/ErrorRequest';
import Footer from 'src/components/footer';
import Icon from 'src/components/icons';
import Logo from 'src/components/Logo';
import { APILoader } from 'src/components/table/ApiLoader';
import Table from 'src/components/table/Table';
import styled from 'styled-components';

interface ManageRequestProps {
  className?: string;
}

const TeamRequest = ({ className }: ManageRequestProps) => {
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
        <h1>Manage Team Leave</h1>
        <div>
          {/* New API needed - find users with manager ID that matches the userID of manager logged in */}
          <APILoader url={'http://localhost:1234/getRequestByManagerId?users.managerId=' + userId} Component={RequestsTable} />
        </div>
        <Footer />
      </ContentWrapper>
    </div>
  );
};

function RequestsTable({ data }) {
  const leave = data.Data;

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

  const deleteLeave = async (leaveID) => {
    const formData = new FormData();
    formData.append('leaveId', leaveID);
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

  function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    alert(count);
    return count;
  }

  return (
    <Table
      headers={['Request Type', 'Start Date', 'End Date', 'Status', 'Actions']}
      rows={leaveList.map((service) => [
        service.requestType,
        service.startDate.slice(0, 16),
        service.endDate.slice(0, 16),
        service.status,
        <div>
          {/* Add onClick actions to upade the user request to approve or deny */}
          <Button>
            <Icon name='check' />
          </Button>
          <Button onClick={() => getBusinessDatesCount(new Date(service.startDate.slice(0, 23)), new Date(service.endDate.slice(0, 23)))}>
            <Icon name='delete' />
          </Button>
        </div>,
      ])}
    />
  );
}

const StyledTeamRequest = styled(TeamRequest)`
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

  div:nth-of-type(2) {
    margin: 45px;
    flex-grow: 1;
  }

  span button {
    z-index: ${(props) => props.theme.zLayers.overlay};
    position: relative;
    top: 5.8rem;
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
export default StyledTeamRequest;
