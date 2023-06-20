import Button from 'src/components/Button';
import styled from 'styled-components';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useContext, useEffect, useState } from 'react';
import Logo from 'src/components/Logo';
import { UserContext } from 'src/contexts/UserContext';
import Toggle from 'src/components/Toggle';
import Link from 'next/link';

interface CalendarProps {
  className?: string;
}

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  top: 6rem;
  right: 2rem;
  h4 {
    margin-right: 10px;
    line-height: 2.3;
  }
  ${Toggle} {
    > label {
      &:before {
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }
`;

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

const CalendarView = ({ className }: CalendarProps) => {
  const [events, setEvents] = useState([]);
  const { userId, isManager } = useContext(UserContext);
  const [showLeave, setShowLeave] = useState(false);

  async function getData() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect,
    };

    fetch('http://localhost:1234/getApprovedRequestByUserId?userId=' + userId, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.Data);
        let appointments = response.Data;

        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = appointments[i].startDate;
          appointments[i].end = appointments[i].endDate;
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (showLeave) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow' as RequestRedirect,
      };

      fetch('http://localhost:1234/getRequestByManagerId?users.managerId=' + userId + '&holiday.status=Approved', requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.Data);
          let appointments = response.Data;

          for (let i = 0; i < appointments.length; i++) {
            appointments[i].start = appointments[i].startDate;
            appointments[i].end = appointments[i].endDate;
            appointments[i].title = appointments[i].requestType + ' (' + appointments[i].email + ')';
            appointments[i].allDay = true;
          }

          setEvents(events.concat(appointments));

          return;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [showLeave]);

  useEffect(() => {
    if (!showLeave) {
      getData();
    }
  }, [showLeave]);

  return (
    <div className={className}>
      <Logo />
      <Link href='/home'>
        <Button primary>Back</Button>
      </Link>
      {isManager && (
        <ToggleWrapper>
          <h4>Show Team Leave?</h4>
          <Toggle onChange={() => setShowLeave(!showLeave)} checked={showLeave} label='Show Team Leave' slug='show team Leave' />{' '}
        </ToggleWrapper>
      )}

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
    margin-right: 1rem;
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
