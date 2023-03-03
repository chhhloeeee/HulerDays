import styled from "styled-components";
import AboutTwo from "./background/AboutTwo";
import Button from "./Button";
import Logo from "./Logo";

interface LoginFormProps {
  className?: string;
}

const LoginForm = ({ className }: LoginFormProps) => {
  return (
    <div className={className}>
      <Logo />
      <h1>HulerDays</h1>
      <div>
        <Button primary href="/home">
          Login
        </Button>
      </div>
      <AboutTwo />
    </div>
  );
};

const StyledLoginForm = styled(LoginForm)`
  background: #efeeee;
  max-height: 100vh;
  overflow: hidden;

  h1 {
    margin: 0;
    position: relative;
    top: 4rem;
    padding-bottom: 15rem;
    line-height: 1.15;
    font-size: 4rem;
    color: #fb6666;
    text-align: center;
  }

  ${Logo} {
    position: absolute;
    left: 2rem;
    top: 1rem;
  }

  div:nth-of-type(2) {
    position: relative;
    width: 700px;
    height: 300px;
    top: 30%;
    margin: auto;
    border-radius: 15px;
    background-color: #fff;
    z-index: ${(props) => props.theme.zLayers.default};
    button {
      left: 40%;
      top: 80%;
    }
  }
  ${AboutTwo} {
    z-index: 0;
    transform: rotate(170deg);
    top: -28rem;
    position: relative;
  }
`;
export default StyledLoginForm;
