/* eslint-disable react/jsx-key */
import { useState } from "react";
import Button from "src/components/Button";
import ContentWrapper from "src/components/ContentWrapper";
import StyledErrorRequest from "src/components/ErrorRequest";
import Footer from "src/components/footer";
import Icon from "src/components/icons";
import Logo from "src/components/Logo";
import { APILoader } from "src/components/table/ApiLoader";
import Table from "src/components/table/Table";
import styled from "styled-components";

interface ManageRequestProps {
  className?: string;
}

const ManageRequest = ({ className }: ManageRequestProps) => {
  const userId = 2;
  return (
    <div className={className}>
      <ContentWrapper>
        <Logo />
        <span>
          <Button primary href="/home">
            Back
          </Button>
        </span>
        <h1>Manage Leave Requests</h1>
        <div>
          <APILoader
            url={"http://localhost:1234/getRequestByUserId?userId=" + userId}
            Component={RequestsTable}
          />
        </div>
        <Footer />
      </ContentWrapper>
    </div>
  );
};

function RequestsTable({ data }) {
  const [leave, setLeave] = useState(data.Data);

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

  const deleteLeave = async (values, e) => {
    console.log(values);
    const XHR = new XMLHttpRequest();
    const formData = new FormData();
    e.preventDefault();

    for (const [] of Object.entries(values)) {
      formData.append("leaveId", values.leaveID);
    }

    // Define what happens on successful data submission
    XHR.addEventListener("load", (e) => {
      return;
    });

    // Define what happens in case of an error
    XHR.addEventListener("error", (e) => {
      alert("Oops! Something went wrong.");
    });

    // Set up our request
    XHR.open("DELETE", "http://localhost:1234/deleteRequest");

    // Send our FormData object; HTTP headers are set automatically

    XHR.setRequestHeader("Content-Type", "multipart/form-data");
    XHR.send(formData);
  };
  return (
    <form onSubmit={(e) => deleteLeave} encType="multipart/form-data" action="">
      <Table
        headers={[
          "Request Type",
          "Start Date",
          "End Date",
          "Status",
          "Actions",
        ]}
        rows={leaveList.map((service) => [
          service.requestType,
          service.startDate,
          service.endDate,
          service.status,
          <div>
            <Button type="submit">
              <Icon name="delete" />
            </Button>
          </div>,
        ])}
      />
    </form>
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
export default StyledManageRequest;
