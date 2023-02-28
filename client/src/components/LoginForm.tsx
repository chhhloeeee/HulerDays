import styled from "styled-components";
import AboutTwo from "./background/AboutTwo";
import Button from "./Button";

interface LoginFormProps {
  className?: string;
}

const LoginForm = ({ className }: LoginFormProps) => {
  return (
    <div className={className}>
      <h1>Hello</h1>
      <Button primaryOutline href="/home">
        Login
      </Button>
      <AboutTwo />
    </div>
  );
};

const StyledLoginForm = styled(LoginForm)`
  background: #efeeee;
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
  z-index: -5;
  overflow: hidden;
`;
export default StyledLoginForm;
