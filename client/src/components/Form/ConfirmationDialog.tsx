/* eslint-disable react/no-danger */
import { useEffect, useRef, useCallback, MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Icon from '../icons';

interface ConfirmationDialogProps {
  className?: string;
  title: string;
  message: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
  confirm: (event: MouseEvent) => void;
  cancel: (event: MouseEvent) => void;
}

const ConfirmationDialog = ({ className, title, message, confirm, cancel, confirmText, cancelText, icon }: ConfirmationDialogProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside of the modal
  const handleClick = useCallback(
    (e) => {
      if (modalRef.current && modalRef.current.contains(e.target)) return;
      // outside click
      if (cancel) cancel(e);
    },
    [cancel],
  );

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => document.removeEventListener('mousedown', handleClick);
  }, [handleClick]);

  return (
    <div className={className}>
      <div ref={modalRef}>
        <div>
          {icon && <Icon name={icon} />}
          <h1>{title}</h1>
          <p>{message}</p>
          {cancel && <Button darkOutline text={cancelText} onClick={cancel} />}
          {confirm && <Button text={confirmText} onClick={confirm} />}
        </div>
      </div>
    </div>
  );
};

interface StyledConfirmationDialogProps {
  primaryTitle?: boolean;
}

const StyledConfirmationDialog = styled(ConfirmationDialog)<StyledConfirmationDialogProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(4px);
  background: var(--modal-container);
  z-index: ${(props) => props.theme.zLayers.important};
  > div {
    width: 500px;
    min-height: 300px;
    background-color: var(--modal-inner);
    color: #fff;
    border-radius: 10px;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    position: absolute;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    ${(props) =>
      props.primaryTitle &&
      `
      svg, h1 {
        color: var(--primary-color);
        fill: var(--primary-color);
      }
      `}

    svg {
      width: 20px;
      margin-bottom: 5px;
    }
    h1 {
      width: 100%;
      text-align: center;
      font-size: 24px;
      margin-bottom: 10px;
    }
    p {
      width: 100%;
      margin-bottom: 20px;
    }
    ${Button} {
      margin: 5px !important;
      min-width: 100px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.medium}) {
    > div {
      width: calc(100% - 40px);
    }
  }
`;

export default StyledConfirmationDialog;
