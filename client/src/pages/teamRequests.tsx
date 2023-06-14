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

  function calcBusinessDays(starDate, endDate) {
    // input given as Date objects
    var dDate1 = new Date(starDate);
    var dDate2 = new Date(endDate);

    var iWeeks,
      iDateDiff,
      iAdjust = 0;

    if (dDate2 < dDate1) return -1; // error code if dates transposed

    var iWeekday1 = dDate1.getDay(); // day of week
    var iWeekday2 = dDate2.getDay();

    iWeekday1 = iWeekday1 == 0 ? 7 : iWeekday1; // change Sunday from 0 to 7
    iWeekday2 = iWeekday2 == 0 ? 7 : iWeekday2;

    if (iWeekday1 > 5 && iWeekday2 > 5) iAdjust = 1; // adjustment if both days on weekend

    iWeekday1 = iWeekday1 > 5 ? 5 : iWeekday1; // only count weekdays
    iWeekday2 = iWeekday2 > 5 ? 5 : iWeekday2;

    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000);

    if (iWeekday1 <= iWeekday2) {
      iDateDiff = iWeeks * 5 + (iWeekday2 - iWeekday1);
    } else {
      iDateDiff = (iWeeks + 1) * 5 - (iWeekday1 - iWeekday2);
    }

    iDateDiff -= iAdjust; // take into account both days on weekend

    return iDateDiff + 1; // add 1 because dates are inclusive
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
          <Button onClick={() => alert(calcBusinessDays(service.startDate.slice(0, 23), service.endDate.slice(0, 23)))}>
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
