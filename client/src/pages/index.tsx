import UserContextProvider from "src/components/contexts/UserContext";
import Footer from "src/components/footer";
import LoginForm from "src/components/LoginForm";

const Login = () => {
  return (
    <div>
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
      <Footer />
    </div>
  );
};

export default Login;
