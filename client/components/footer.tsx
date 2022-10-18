import styled from "styled-components";

interface FooterProps {
  className?: string;
}
const Footer = ({ className }: FooterProps) => {
  return (
    <div className={className}>
      <footer />
    </div>
  );
};

Footer.defaultProps = {
  className: "",
};

const StyledFooter = styled(Footer)`
  footer {
    display: flex;
    flex: 1;
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem 0;
    justify-content: center;
    align-items: center;
    background: #fb6666;
  }
`;

export default StyledFooter;
