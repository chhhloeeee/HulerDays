import styled, { css } from "styled-components";

interface AdminFormSelectRoundedOptionButtonProps {
  active?: boolean;
}

const AdminFormSelectRoundedOptionButton = styled.button<AdminFormSelectRoundedOptionButtonProps>`
  display: flex;
  align-items: center;
  color: var(--contrast);
  padding: 15px 20px;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0px;
  font-weight: 600;
  transition: ${(props) => props.theme.transitions.default};
  width: 100%;
  border-radius: 10px;
  text-align: left;
  word-break: break-word;
  &:before {
    content: "";
    display: block;
    height: 12px;
    width: 12px;
    flex-shrink: 0;
    border-radius: 10px;
    transition: ${(props) => props.theme.transitions.default};
    border: 2px solid #414049;
    margin-right: 10px;
    box-sizing: border-box;
    margin-top: 3px;
  }

  ${(props) =>
    props.active &&
    css`
      background: var(--selected-option-background);

      &:before {
        background: var(--primary-color);
        border-color: var(--primary-color);
      }
    `}
`;

export default AdminFormSelectRoundedOptionButton;
