import { Formik } from "formik";
import styled from "styled-components";
import AboutTwo from "./background/AboutTwo";
import Button from "./Button";
import Logo from "./Logo";

interface LoginFormProps {
  className?: string;
}

interface Values {
  email: string | number;
  password: string | number | readonly string[];
}

const LoginForm = ({ className }: LoginFormProps) => {
  return (
    <div className={className}>
      <Logo />
      <h1>HulerDays</h1>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnMount
          onSubmit={(values: Values, { setSubmitting, resetForm }) => {
            //handleChangePassword(values, setSubmitting);
            setSubmitting(true);
            setTimeout(() => {
              resetForm();
            }, 400);
          }}
        >
          {({ handleSubmit, handleBlur, handleChange, values }) => (
            <div>
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </form>
            </div>
          )}
        </Formik>
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

    z-index: ${(props) => props.theme.zLayers.default};
    button {
      left: 40%;
    }
  }
  ${AboutTwo} {
    z-index: 0;
    transform: rotate(170deg);
    top: -28rem;
    position: relative;
  }
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    padding: 0 5px;
    padding-top: 3rem;
    input {
      border-radius: 50px;
      padding: 20px;
      border: 3px solid #c1c7d0;
      flex: 1;
      outline: none;
      font-family: sofia-pro, sans-serif;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 26px;
      color: #c1c7d0;

      @media screen and (max-width: ${(props) =>
          props.theme.breakpoints.small}) {
        padding: 8px 16px;
      }

      &::placeholder {
        font-family: sofia-pro, sans-serif;
        color: #c1c7d0;
      }
      &:active,
      &:focus {
      }
      @media only screen and (max-width: 500px) {
        font-size: 16px;
      }
    }
  }
`;
export default StyledLoginForm;
