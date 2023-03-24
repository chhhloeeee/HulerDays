import styled from "styled-components";

const AdminTableFooter = styled.div`
  position: relative;
  width: 100%;
  bottom: 0;
  padding: 20px 45px;
  border-top: 1px solid var(--border);
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.large}) {
    width: 100%;
    left: 0;
    padding: 20px 25px;
  }

  span {
    font-size: 15px;

    padding: 15px 25px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default AdminTableFooter;
