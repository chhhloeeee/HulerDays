import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AdminFormDatePickerProps {
  className?: string;
  label: string;
  placeholder: string;
  value?: Date;
  setValue: (val: Date) => void;
  hasError?: boolean;
  error?: string;
}

const FormDatePicker = ({ className, label, placeholder, value, setValue, hasError, error }: AdminFormDatePickerProps) => (
  <div className={className}>
    <span>{label}</span>
    <DatePicker selected={value} onChange={(e: Date) => setValue(e)} dateFormat='dd/MM/yyyy' placeholderText={placeholder} />
    {hasError && <span>{error}</span>}
  </div>
);

const StyledFormDatePicker = styled(FormDatePicker)`
  position: relative;
  > span {
    font-size: 14px;
    letter-spacing: 0px;
    color: #b8b8b8;
    font-weight: 500;
    margin-bottom: 10px;
    display: block;
  }

  input {
    border: none;
    background: none;
    border-bottom: 1px solid #414049;
    font-size: 16px;
    letter-spacing: 0px;
    color: black;
    padding: 10px 0;
    width: 100%;
    transition: 0.25s ease;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: black;
    }
  }

  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 50px #ffffff inset !important;
  }

  label {
    font-size: 14px;
    letter-spacing: 0px;
    color: #b8b8b8;
    font-weight: 500;
    margin-bottom: 10px;
    display: block;

    span {
      color: var(--primary-color);
    }
  }

  .react-datepicker {
    font-family: sofia-pro, sans-serif;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: var(--primary-color);

    &:hover {
      background: var(--primary-color);
    }
  }

  .react-datepicker__header {
    background-color: var(--panel-background);
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: var(--contrast);
  }
`;

export default StyledFormDatePicker;
