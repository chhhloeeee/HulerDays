import styled from "styled-components";
import AboutTwo from "../components/background/AboutTwo";
import Button from "../components/Button";
import ContainerWrapper from "../components/containerWrapper";
import Footer from "../components/footer";

interface PolicyProps {
  className?: string;
}
const Policies = ({ className }: PolicyProps) => {
  return (
    <div className={className}>
      <ContainerWrapper>
        <h1>Policies</h1>
        <Button primaryOutline href="/">
          Back
        </Button>
      </ContainerWrapper>
      <AboutTwo />
      <Footer />
    </div>
  );
};

Policies.defaultProps = {
  className: "",
};
const StyledPolicies = styled(Policies)`
  background: #efeeee;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: -5;
  overflow: hidden;

  h1 {
    margin: 0;
    position: relative;
    top: 1rem;
    padding-bottom: 3rem;
    line-height: 1.15;
    font-size: 3.5rem;
    color: #fb6666;
    text-align: center;
  }
  button {
    margin-top: 40%;
    left: 2rem;
  }
`;
export default StyledPolicies;
