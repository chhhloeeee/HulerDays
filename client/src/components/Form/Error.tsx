import styled from 'styled-components';

interface ErrorProps {
  attached?: boolean;
}

export const Error = styled.span<ErrorProps>`
  color: #fff;
  display: inline-block;
  width: 90%;
  margin: 20px auto;
  padding: 15px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 21px;
  position: relative;
  background-color: var(--primary-color);
  ${(props) =>
    props.attached &&
    `
      width: 80%;
      position: absolute;
      top: calc(100% - 26px);
      left: 0;
      font-size: 12px;
      margin: 0 auto;
      z-index: ${props.theme.zLayers.overlay};
      border-radius: 0 0 20px 20px;
      padding: 10px;
      left: 0;
      right: 0;
    `}
`;
