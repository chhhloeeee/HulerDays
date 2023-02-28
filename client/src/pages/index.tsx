import Button from "src/components/Button";
import ContentWrapper from "src/components/ContentWrapper";

const Login = () => {
  return (
    <div>
      <ContentWrapper>
        <h1>Hello</h1>
        <Button primaryOutline href="/home">
          Login
        </Button>
      </ContentWrapper>
    </div>
  );
};

export default Login;
