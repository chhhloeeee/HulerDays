import Button from "src/components/Button";
import styled from "styled-components";

interface CalendarProps {
  className?: string;
}

const CalendarView = ({ className }: CalendarProps) => {
  return (
    <div>
      <Button primary href="/home">
        Back
      </Button>
    </div>
  );
};

const StyledCalendarView = styled(CalendarView)`
  button {
    position: absolute;
    left: 3rem;
    bottom: 6rem;
  }
`;
export default StyledCalendarView;
