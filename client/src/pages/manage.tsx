/* eslint-disable react/jsx-key */
import { useState } from "react";
import Button from "src/components/Button";
import ContentWrapper from "src/components/ContentWrapper";
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
  return (
    <div className={className}>
      <ContentWrapper>
        <Logo />
        <h1>Manage Leave Requests</h1>
        <APILoader
          url={"http://localhost:8080/api/v1/requests"}
          Component={RequestsTable}
        />
        <Button primary href="/home">
          Back
        </Button>
        <Footer />
      </ContentWrapper>
    </div>
  );
};

function RequestsTable({ data }) {
  const [users, setUsers] = useState(data);
  console.log(data);

  let userList = users.sort((a, b) => {
    if (a.userID < b.userID) {
      return -1;
    }
    if (a.userID > b.userID) {
      return 1;
    }
    return 0;
  });
  const deleteUserCall = async (userID) => {
    return await fetch("http://localhost:8080/api/v1/users/" + userID, {
      method: "DELETE",
    });
  };

  const deleteUser = (userID) => {
    const array = [...userList];
    for (let i = 0; i < array.length; i++) {
      if (userID === array[i].userID) {
        let promise = deleteUserCall(userID);
        promise
          .then((response) => {
            if (!response.ok) {
              alert("Something went wrong");
              return;
            }
            alert("Delete Success");
            array.splice(i, 1);

            setUsers(array);
            return;
          })
          .catch((error) => {
            alert("Internal Server Error");
            return;
          });
      }
    }
    return;
  };
  return (
    <Table
      headers={["Request Type", "Start Date", "End Date", "Status", "Action"]}
      rows={userList.map((service) => [
        service.requestType,
        service.startDate,
        service.endDate,
        service.status,
        <div>
          <Button onClick={() => deleteUser(service.userID)}>
            <Icon name="remove" />
          </Button>
        </div>,
      ])}
    />
  );
}

const StyledManageRequest = styled(ManageRequest)`
  h1 {
    margin: 0;
    position: relative;
    top: 3rem;
    padding-bottom: 2rem;
    line-height: 1.15;
    font-size: 3.5rem;
    color: #fb6666;
    text-align: center;
  }
  button {
    position: absolute;
    left: 3rem;
    bottom: 6rem;
  }
`;
export default StyledManageRequest;
