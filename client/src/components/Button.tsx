/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  className?: string;
  text?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
  primary?: boolean;
  primaryOutline?: boolean;
  whiteOutline?: boolean;
  greyOutline?: boolean;
  darkSolid?: boolean;
  darkOutline?: boolean;
  secondary?: boolean;
  primaryOutlineDark?: boolean;
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  id?: string;
}

const Button = ({ href, text, children, className, type = 'button', disabled = false, onClick, id = '' }: ButtonProps) => {
  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        <button className={className} type='button' onClick={onClick} id={id} disabled={disabled}>
          {children || text}
        </button>
      </a>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} onClick={onClick} type={type} disabled={disabled} id={id}>
      {children}
    </button>
  );
};

const StyledButton = styled(Button)`
  white-space: nowrap;
  font-size: 18px;
  height: 48px;
  font-family: inherit;
  font-weight: 600;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1.8rem;
  min-width: 8rem;
  border-radius: 1000px;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, transform 0.2s ease-in-out, text-shadow 0.2s ease-in-out;
  position: relative;
  outline: none;
  user-select: none;
  text-decoration: none;
  line-height: 1.2;
  &:hover {
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
    transform: scale(1.05);
  }
  &:active {
    transform: none;
    transition: transform 0s;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;
  }
  ${(props) =>
    props.primary &&
    `
      background: #fb6666;;
      color: white;
      &:hover {
          text-shadow: 0 0 4px rgba(255,255,255, .6);
      }
    `}

  ${(props) =>
    props.secondary &&
    `
      background: #fff;
      color: #fb6666;;
      &:hover {
          text-shadow: 0 0 4px rgba(255,255,255, .6);
      }
    `}

  ${(props) =>
    props.primaryOutline &&
    `
      box-shadow: inset 0 0 0 2px  #fb6666;;
      color:#fb6666;;
      &:hover {
          background: #fb6666;;
          color: white;
          text-shadow: 0 0 4px rgba(255,255,255, .6);
      }
    `}

  ${(props) =>
    props.whiteOutline &&
    `
    border: solid 2px #ffffff;
    color: white;
  `}


  ${(props) =>
    props.darkSolid &&
    `
      background: #23262d;
      color: white;
      &:hover {
          text-shadow: 0 0 4px rgba(255,255,255, .6);
      }
    `}

  ${(props) =>
    props.darkOutline &&
    `
      box-shadow: inset 0 0 0 2px  #23262d;
      color: #23262d;
      &:hover {
          background:  #23262d;
          color: white;
          text-shadow: 0 0 4px rgba(255,255,255, .6);
      }
    `}
     ${(props) =>
    props.primaryOutlineDark &&
    `
      box-shadow: inset 0 0 0 2px #fb6666;;
      color: black;
      &:hover {
          background:  #fb6666;;
          color: white;
          text-shadow: 0 0 4px rgba(255,255,255, .6);
      }
    `}
`;

export default StyledButton;
