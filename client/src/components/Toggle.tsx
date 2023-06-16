import styled from 'styled-components';
import { ChangeEvent } from 'react';

interface ToggleProps {
  className?: string;
  testId?: string;
  slug?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: {
    (e: ChangeEvent<unknown>): void;
    <T = string | ChangeEvent<unknown>>(field: T): T extends ChangeEvent<unknown> ? void : (e: string | ChangeEvent<unknown>) => void;
  };
  onText?: string;
  offText?: string;
  label?: string;
}

const Toggle = ({
  className = '',
  testId = '',
  slug = '',
  checked = false,
  disabled = false,
  onChange = () => {},
  onText,
  offText,
  label = '',
}: ToggleProps) => {
  return (
    <div className={className}>
      <input
        id={slug}
        name={slug}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        data-testid={testId}
        aria-label={label}
      />
      <label data-on={onText ? onText : 'Yes'} data-off={offText ? offText : 'No'} htmlFor={slug} />
    </div>
  );
};

interface StyledToggleProps {
  size?: 'normal' | 'small';
}

const StyledToggle = styled(Toggle)<StyledToggleProps>`
  position: relative;
  > input {
    height: 0 !important;
    width: 0 !important;
    position: absolute !important;
    -webkit-appearance: none !important;
    opacity: 0 !important;
    &:focus {
      & + label {
        box-shadow: inset 0 0 0 2px var(--primary-color);
      }
    }
    &:checked + label {
      background: var(--primary-color);
      &:before {
        content: attr(data-on);
        left: 9px;
        right: auto;
        color: #fff;
      }
      &:after {
        left: calc(100% - 5px);
        transform: translateX(-100%);
      }
    }
  }
  > label {
    width: 62px;
    height: 32px;
    background: var(--toggle-input-background);
    border-radius: 30px;
    position: relative;
    cursor: pointer;
    display: block;
    user-select: none;
    opacity: 1 !important;
    transition: ${(props) => props.theme.transitions.default};
    color: black;
    &:before {
      content: attr(data-off);
      color: var(--contrast);
      position: absolute;
      right: 9px;
      top: calc(50% - 1px);
      transform: translateY(-50%);
      font-size: 12px;
    }
    &:after {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      background: var(--toggle-input-thumb-background);
      border-radius: 100%;
      left: 5px;
      top: 5px;
      transition: ${(props) => props.theme.transitions.default};
    }
  }

  ${(props) =>
    props.size === 'small' &&
    `
    > label {
      width: 47px;
      height: 22px;
      font-size: 10px;
      &:after {
        height: 20px;
        width: 20px;
        top: 1px;
        left: 2px;
      }
      &:before {
        font-size: 11px;
        font-weight: 700;
      }
    }
    > input {
      &:checked + label {
        &:before {
          left: 5px;
        }
        &:after {
          left: calc(100% - 2px);
        }
      }
    }
  `}
`;

StyledToggle.defaultProps = {
  size: 'normal',
};

export default StyledToggle;
