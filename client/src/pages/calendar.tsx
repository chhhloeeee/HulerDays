import Button from 'src/components/Button';
import styled from 'styled-components';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import Logo from 'src/components/Logo';
import moment from 'moment';

interface CalendarProps {
  className?: string;
}

const locales = {
  'en-GB': require('date-fns/locale/en-GB'),
};

const localiser = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventStyleGetter = () => {
  var style = {
    backgroundColor: `var(--primary-color)`,
  };
  return {
    style: style,
  };
};

const convertDate = (date) => {
  return moment.utc(date).toDate();
};

const CalendarView = ({ className }: CalendarProps) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getData() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow' as RequestRedirect,
      };

      fetch('http://localhost:1234/getRequestByUserId?userId=1', requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.Data);
          let appointments = response.Data;

          for (let i = 0; i < appointments.length; i++) {
            appointments[i].start = convertDate(appointments[i].startDate);
            appointments[i].end = convertDate(appointments[i].endDate);
            appointments[i].title = appointments[i].requestType;
            appointments[i].allDay = true;
          }

          setEvents(appointments);

          return;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getData();
  }, []);

  return (
    <div className={className}>
      <Logo />
      <Button primary href='/home'>
        Back
      </Button>

      <span>
        <Calendar
          localizer={localiser}
          events={events}
          startAccessor='start'
          endAccessor='end'
          style={{
            height: 800,
            margin: '50px',
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
    span:nth-of-type(2) {
      font-size: 30px;
      font-weight: bold;
    }
  }
`;
export default StyledCalendarView;
