import Button from "src/components/Button";
import styled from "styled-components";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import FormDatePicker from "src/components/DatePicker";
import Logo from "src/components/Logo";

interface CalendarProps {
  className?: string;
}

const locales = {
  "en-GB": require("date-fns/locale/en-GB"),
};

const localiser = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023, 5, 6),
    end: new Date(2023, 5, 6),
  },
  {
    title: "Holiday",
    start: new Date(2023, 5, 17),
    end: new Date(2023, 5, 23),
  },
  {
    title: "Birthday",
    allDay: true,
    start: new Date(2023, 5, 25),
    end: new Date(2023, 5, 25),
  },
];

const eventStyleGetter = () => {
  var style = {
    backgroundColor: `var(--primary-color)`,
  };
  return {
    style: style,
  };
};
const CalendarView = ({ className }: CalendarProps) => {
  return (
    <div className={className}>
      <Logo />
      <Button primary href="/home">
        Back
      </Button>

      <span>
        <Calendar
          localizer={localiser}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 800,
            margin: "50px",
          }}
          eventPropGetter={eventStyleGetter}
        />
      </span>
    </div>
  );
};

const StyledCalendarView = styled(CalendarView)`
  position: relative;
  button {
    top: 5.8rem;
    left: 2rem;
  }

  span {
    padding-top: 5rem;
  }
`;
export default StyledCalendarView;
