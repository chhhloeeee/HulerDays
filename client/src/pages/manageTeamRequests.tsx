/* eslint-disable react/jsx-key */
import { useContext, useState } from 'react';
import Button from 'src/components/Button';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import ContentWrapper from 'src/components/ContentWrapper';
import StyledErrorRequest from 'src/components/ErrorRequest';
import Footer from 'src/components/footer';
import Icon from 'src/components/icons';
import Logo from 'src/components/Logo';
import { APILoader } from 'src/components/table/ApiLoader';
import Table from 'src/components/table/Table';
import { UserContext } from 'src/contexts/UserContext';
import styled from 'styled-components';

interface ManageRequestProps {
  className?: string;
}

const TeamRequest = ({ className }: ManageRequestProps) => {
  const { userId } = useContext(UserContext);
  const TableWrapper = styled.div`
    margin: 45px;
    flex-grow: 1;
  `;

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
        <TableWrapper>
          <APILoader
            url={'http://localhost:1234/getRequestByManagerId?users.managerId=' + userId + '&holiday.status=Pending'}
            Component={RequestsTable}
          />
        </TableWrapper>
        <Footer />
      </ContentWrapper>
    </div>
  );
};

function RequestsTable({ data }) {
  const leave = data.Data;
  const [confirmation, setConfirmation] = useState({
    leaveId: '',
    requestType: '',
    status: '',
  });
  const [showDenyDialog, setShowDenyDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);

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

  const updateRequest = async (values: any) => {
    var formdata = new FormData();
    formdata.append('leaveId', values.leaveId);
    formdata.append('requestType', values.requestType);
    formdata.append('status', values.status);

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow' as RequestRedirect,
    };

    fetch(
      'http://localhost:1234/updateRequest?leaveId=' + values.leaveId + '&requestType=' + values.requestType + '&status=' + values.status,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    window.location.reload();
    return close();
  };

  return (
    <>
      <Table
        headers={['User', 'Request Type', 'Start Date', 'End Date', 'Status', 'Actions']}
        rows={leaveList.map((service) => [
          service.email,
          service.requestType,
          service.startDate.slice(0, 16),
          service.endDate.slice(0, 16),
          service.status,
          <div>
            <Button
              onClick={() => {
                setConfirmation({ leaveId: service.leaveId, requestType: service.requestType, status: 'Approved' });
                setShowApproveDialog(true);
              }}
            >
              <Icon name='check' />
            </Button>
            <Button
              onClick={() => {
                setConfirmation({ leaveId: service.leaveId, requestType: service.requestType, status: 'Denied' });
                setShowDenyDialog(true);
              }}
            >
              <Icon name='delete' />
            </Button>
          </div>,
        ])}
      />
      {showDenyDialog && (
        <ConfirmationDialog
          title='Confirm Action'
          message='Are you sure you want to deny this request?'
          confirm={() => updateRequest(confirmation)}
          cancel={() => setShowDenyDialog(false)}
        />
      )}
      {showApproveDialog && (
        <ConfirmationDialog
          title='Confirm Action'
          message='Are you sure you want to approve this request?'
          confirm={() => updateRequest(confirmation)}
          cancel={() => setShowApproveDialog(false)}
        />
      )}
    </>
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
