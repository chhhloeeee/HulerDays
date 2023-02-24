import React from "react";
import styled from "styled-components";

export interface InputProps {
  className?: string;
  type: string;
  placeholder: string;
  label: string;
  value?: string | undefined;
  name: string;
  size: "sm" | "md" | "lg";
  hideLabel?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  hasError?: boolean;
  error?: string;
  hidden?: boolean;
  applicableTxt?: string;
}

const Input = ({
  className,
  type,
  placeholder,
  label,
  name,
  value = undefined,
  onChange,
  onBlur,
  error,
  hasError,
  applicableTxt,
}: InputProps) => (
  <div className={className}>
    <label htmlFor={name}>{label}</label>
    <input
      value={value}
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
    />
    {applicableTxt && <small>{applicableTxt}</small>}
    {hasError && <span>{error}</span>}
  </div>
);

Input.defaultProps = {
  hideLabel: false,
  hasError: false,
};

const StyledInput = styled(Input)`
  position: relative;

  * {
    font-family: sofia-pro;
  }

  label {
    ${(props) =>
      props.hideLabel && `visibility: hidden; position: absolute; opacity: 0;`}
    display: block;
  }

  span {
    display: block;
    font-size: 15px;
    color: #fb6666;
    margin-top: -0.2rem;
    margin-right: 1rem;
    text-align: right;
    position: absolute;
    right: 0;
  }

  small {
    display: block;
    font-size: 0.6rem;
    margin: 0;
    position: absolute;
    left: 0.5rem;
    color: "#c1c7d0";
    font-weight: 800;
  }

  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 50px #ffffff inset !important;
  }

  input {
    background: white;
    border: 3px solid "#c1c7d0";
    border-radius: 1.5rem;
    font-weight: bold;
    transition: #fb6666;
    height: 3rem;
    color: "#c1c7d0";
    width: 100%;

    &::placeholder {
      opacity: 1;
      color: "#c1c7d0";
    }

    &:focus {
      border: 3px solid "#e3e1e2";
      outline: none;
    }

    ${(props) => props.hideLabel && `margin: 10px 0;`}

    ${(props) =>
      props.hasError &&
      `
      border: 3px solid #fb6666;
      `}
  }

  ${(props) =>
    props.size === "lg" &&
    `
      input{
        font-size: 25px;
        padding: 15px 25px;
      }
      
      label{
          font-size: 18px;
          padding: 20px 0;
      }

   `}

  ${(props) =>
    props.size === "md" &&
    `
      input{
        font-size: 20px;
        padding: 1.2rem 1.5rem;
      }
      
      label{
          font-size: 14px;
          padding: 14px 0;
      }

   `}

  ${(props) =>
    props.size === "sm" &&
    `
      input{
        font-size: 18px;
        padding: 10px 16px;
      }
      
      label{
          font-size: 12px;
          padding: 12px 0;
      }

   `}

  ${(props) =>
    props.hidden &&
    `
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
      pointer-events: none;
   `}
`;

export default StyledInput;
