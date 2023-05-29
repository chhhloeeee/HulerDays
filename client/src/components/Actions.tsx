import React from "react";
import styled from "styled-components";
import Button from "./Button";

export interface ActionsProps {
  className?: string;
  invalid?: boolean;
  onCancel?: () => void;
  onCreate?: () => void;
  onCreateAnother?: () => void;
  showCreateAnother?: boolean;
  noWrap?: boolean;
}

const Actions = ({ className, invalid, onCancel, onCreate }: ActionsProps) => {
  return (
    <div className={className}>
      <Button onClick={onCancel} darkOutline>
        Cancel
      </Button>
      <Button disabled={invalid} onClick={onCreate} primaryOutline>
        Save
      </Button>
    </div>
  );
};

Actions.defaultProps = {
  className: "",
  invalid: false,
  onCancel: () => {},
  onCreate: () => {},
  onCreateAnother: () => {},
  noWrap: false,
};

const StyledActions = styled(Actions)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  position: relative;
  @media screen and (max-width: 750) {
    margin-bottom: 0;
  }
  @media screen and (max-width: 600) {
    flex-wrap: ${(props) => (props.noWrap ? "nowrap" : "wrap")};
    button {
      width: ${(props) => (props.noWrap ? "auto" : "100%")};
      margin: 5px 0;
    }
  }
  ${(props) =>
    props.noWrap &&
    `
    button {
      margin: 0 0.5rem;
    }
  `}

  ${Button} {
    :first-child {
      margin-right: 1rem;
    }
  }
`;

export default StyledActions;
