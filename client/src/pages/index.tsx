import Button from "src/components/Button";
import ContentWrapper from "src/components/ContentWrapper";
import Logo from "src/components/Logo";

const Login = () => {
  return (
    <div>
      <ContentWrapper>
        <Logo />
        <h1>Hello</h1>
        <Button primaryOutline href="/home">
          Login
        </Button>
      </ContentWrapper>
    </div>
  );
};

export default Login;
