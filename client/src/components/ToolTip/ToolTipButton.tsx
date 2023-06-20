import styled from 'styled-components';

interface ToolTipButtonProps {
  active?: boolean;
  position?: 'above-left' | 'above-right' | 'left' | 'right';
  inline?: boolean;
}

const ToolTipButton = styled.button<ToolTipButtonProps>`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: ${(props) => props.theme.zLayers.default};
  cursor: pointer;

  ${(props) =>
    props.position === 'above-left' &&
    `
      top: -13px;
      left: 5px;
      right: 0;
  `}

  ${(props) =>
    props.position === 'above-right' &&
    `
      top: -10px;
      right: 5px;
      left: initial;
  `}

  ${(props) =>
    props.position === 'left' &&
    `
      left: 5px;
      right: initial;
  `}

  ${(props) =>
    props.position === 'right' &&
    `
      > span {
        right: 15px;
      }
  `}

  ${(props) =>
    props.inline &&
    `
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      margin: 5px 0;
  `}
  svg {
    fill: black;
    width: 14px;
    height: 14px;
    border: 2px solid var(--primary-color);
    border-radius: 12px;
    &:before {
      content: 'i';
    }
  }
  &:hover {
    span {
      opacity: 1;
      visibility: visible;
    }
  }
  ${(props) =>
    props.active &&
    `
    > span {
        opacity: 1;
        visibility: visible;
    }
  `}
  > span {
    position: absolute;
    width: 220px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: ${(props) => props.theme.transitions.default};
    border-radius: 4px;
    background-color: var(--background);
    box-shadow: 0px 6px 6px #00000040;
    border-radius: 10px;
    padding: 15px;
    font-size: 12px;
    font-family: ${(props) => props.theme.fonts.primaryFont};
    color: var(--body-text-color);
    white-space: normal;
    left: 20px;
    top: 0;
  }
`;

export default ToolTipButton;
