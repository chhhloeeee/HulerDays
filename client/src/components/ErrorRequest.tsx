import Image from "next/image";
import Calendar from "../Images/calendar.svg";
import styled from "styled-components";

interface ErrorProps {
  className?: string;
}
const ErrorRequest = ({ className }: ErrorProps) => {
  return (
    <div className={className}>
      <div>
        <Image src={Calendar} alt="calendar" width={271.11} height={271.11} />
        <h1>Sorry!</h1>
        <h2>Looks like there are no requests yet</h2>
      </div>
    </div>
  );
};

const StyledErrorRequest = styled(ErrorRequest)`
  position: relative;
  top: 5rem;
  width: 40%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 10px 40px #00000040;
  height: 450px;
  margin: auto;
  text-align: center;
  h1 {
    color: black !important;
    top: -1rem !important;
  }
  h2 {
    position: relative;
    text-align: center;
  }
`;
export default StyledErrorRequest;
