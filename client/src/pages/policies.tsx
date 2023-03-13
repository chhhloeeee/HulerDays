import { scrollStyling } from "src/styles/mixins";
import styled from "styled-components";
import AboutTwo from "../components/background/AboutTwo";
import Button from "../components/Button";
import ContainerWrapper from "../components/containerWrapper";
import Footer from "../components/footer";
import Logo from "../components/Logo";

interface PolicyProps {
  className?: string;
}
const Policies = ({ className }: PolicyProps) => {
  return (
    <div className={className}>
      <Logo />
      <h1>Policies</h1>
      <ContainerWrapper>
        <figure>
          <strong>Overview</strong>
          <p>
            Our holiday year runs from 1st January to 31st December, the
            standard entitlement is 25 days plus bank holidays.
          </p>
          <p>
            When an employee joins/leaves the company part way through the year,
            they will be notified of their pro-rata annual leave entitlement.
          </p>
          <p>
            Around September time, you’ll receive an update on how much holiday
            each of your team has left to book.
          </p>
          <br />
          <strong>Staff employed during covid-19 (2020)</strong>
          <p>
            In line with government guidance, staff employed throughout 2020 who
            were unable to use all of their annual leave entitlement due to
            covid-19 are able to roll their unused 2020 days into 2021 and 2022.
            Only unused days from 2020 can be carried forward, staff will not be
            able to carry forward any unused days from your standard 2021
            entitlement.{" "}
          </p>
          <p>
            As an additional benefit in 2021, staff who feel they will be unable
            to make use of all their holiday entitlement or would prefer to
            exchange these for the equivalent monetary value will be able to
            sell up to 5 days back to the company.
          </p>
        </figure>
      </ContainerWrapper>
      <Button secondary href="/home">
        Back
      </Button>
      <AboutTwo />
      <Footer />
    </div>
  );
};

Policies.defaultProps = {
  className: "",
};
const StyledPolicies = styled(Policies)`
  background: var(--background);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: -5;
  overflow: hidden;

  h1 {
    margin: 0;
    position: relative;
    top: 3rem;
    padding-bottom: 2rem;
    line-height: 1.15;
    font-size: 3.5rem;
    color: #fb6666;
    text-align: center;
  }
  button {
    position: absolute;
    left: 3rem;
    bottom: 6rem;
    box-shadow: inset 0 0 0 2px #fb6666;
  }
  figure {
    position: relative;
    width: 70%;
    height: 85%;
    margin: auto;
    text-align: center;
    top: 3rem;
    margin-bottom: 2rem;
    overflow-y: scroll;
    padding-right: 5px;
    ${scrollStyling};

    p {
      text-align: left;
      line-height: 2em;
    }
  }
`;
export default StyledPolicies;
