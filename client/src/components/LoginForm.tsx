import { Formik } from "formik";
import { useRouter } from "next/router";
import styled from "styled-components";
import AboutTwo from "./background/AboutTwo";
import Button from "./Button";
import Logo from "./Logo";
import { Error } from "./form/Error";
import * as Yup from "yup";

interface LoginFormProps {
  className?: string;
}

interface Values {
  email: string;
  password: string;
}

const FormWrapper = styled.div`
  position: relative;
  width: 700px;
  height: 300px;
  margin: auto;
  border-radius: 15px;

  z-index: ${(props) => props.theme.zLayers.default};
  button {
    position: absolute;
    top: 90%;
    left: 40%;
  }
`;

const LoginForm = ({ className }: LoginFormProps) => {
  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Your Password must be longer than 8 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const router = useRouter();
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
          validationSchema={LoginSchema}
          validateOnMount
          onSubmit={(values: Values, { setSubmitting, resetForm }) => {
            console.log("here");
            //handleChangePassword(values, setSubmitting);
            router.push("/home");
            setSubmitting(false);
            setTimeout(() => {
              resetForm();
            }, 400);
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <FormWrapper>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div>
                  <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {!!(errors.email && touched.email) && (
                    <Error attached>{errors.email}</Error>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {!!(errors.password && touched.password) && (
                    <Error attached>{errors.password}</Error>
                  )}
                </div>
              </form>
              <Button primary type="submit" onClick={() => handleSubmit()}>
                Login
              </Button>
            </FormWrapper>
          )}
        </Formik>
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

  ${AboutTwo} {
    z-index: 0;
    transform: rotate(170deg);
    top: -28rem;
    position: relative;
  }
  form {
    div {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 100%;
      position: relative;
      padding: 0 5px;
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
        &:last-of-type {
          margin-top: 26px;
        }

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
  }
`;
export default StyledLoginForm;
