import styled from 'styled-components';

interface AdminFormSectionProps {
  flex?: boolean;
  dangerous?: boolean;
}

const AdminFormSection = styled.div<AdminFormSectionProps>`
  display: grid;
  max-width: 950px;
  + div {
    margin-top: 40px;
  }

  > div + div {
    margin-top: 30px;
  }

  ${(props) =>
    props.flex &&
    `
    display: flex;
    align-items: center;

    h3 {
      margin-bottom: 0;
      margin-right: 20px;
    }
  `}

  ${(props) =>
    props.dangerous &&
    `
    border: 1px solid #d63636;
    padding: 20px;
    border-radius: 5px;
  `}
`;

export default AdminFormSection;
