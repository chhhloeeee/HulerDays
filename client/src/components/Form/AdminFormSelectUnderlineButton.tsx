import styled from "styled-components";

interface AdminFormSelectUnderlineButtonProps {
  hasError?: boolean;
}

const AdminFormSelectUnderlineButton = styled.button<AdminFormSelectUnderlineButtonProps>`
  background: none;
  border-bottom: 1px solid #414049;
  font-size: 16px;
  letter-spacing: 0;
  color: var(--contrast);
  padding: 10px 0;
  width: 100%;
  transition: ${(props) => props.theme.transitions.default};
  text-align: left;
  cursor: pointer;
  position: relative;

  > svg {
    width: 15px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    fill: var(--contrast);
  }

  &:focus {
    outline: none;
    border-color: var(--contrast);
  }

  ${(props) =>
    props.hasError &&
    `
    border-color: var(--primary-color);
    color: var(--primary-color);

    svg {
      fill: var(--primary-color);
    }
  `}
`;

export default AdminFormSelectUnderlineButton;
