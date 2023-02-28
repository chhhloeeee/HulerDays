import { css } from "styled-components";

const typography = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    font-family: ${(props) => props.theme.fonts.primaryFont};
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: left;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    color: var(--title-color);
    margin-bottom: 10px;
  }

  h1 {
    font-size: 30px;
    font-weight: bold;
    color: var(--title-color);
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 15px;
  }
  h5 {
    font-size: 12px;
  }
  h6 {
    font-size: 11px;
  }

  p {
    font-size: 15px;
    font-weight: 300;
    color: var(--body-text-color);
    b,
    strong {
      font-weight: 500;
    }
  }

  b,
  strong {
    font-weight: 500;
  }
`;

export default typography;
