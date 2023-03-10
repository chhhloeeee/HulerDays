import Button from "src/components/Button";
import Logo from "src/components/Logo";
import styled from "styled-components";

interface ManageRequestProps {
  className?: string;
}

const ManageRequest = ({ className }: ManageRequestProps) => {
  return (
    <div className={className}>
      <Logo />
      <h1>Manage Leave Requests</h1>
      <Button primary href="/home">
        Back
      </Button>
    </div>
  );
};

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
