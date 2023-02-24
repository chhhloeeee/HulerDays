import { css } from "styled-components";

const scrollStyling = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--contrast);
    border-radius: 0;
  }
  //Firefox
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar) transparent;
`;

export { scrollStyling };
