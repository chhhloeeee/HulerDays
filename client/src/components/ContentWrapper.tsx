import styled from "styled-components";

const ContentWrapper = styled.div`
  padding: 1rem 2rem;
  background: var(--background);
  font-family: ${(props) => props.theme.fonts.primary};
  min-height: 100vh;
`;

export default ContentWrapper;
