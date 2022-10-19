import Modal from "./modal";
import styled from "styled-components";
import { Form, Formik, FormikHelpers } from "formik";
import Button from "./Button";
import Input from "./Input";
import * as Yup from "yup";
import Actions from "./Actions";

interface FormProps {
  close: () => void;
  className?: string;
}

interface Values {
  name: string;
  lastName: string;
  email: string;
}

const RequestSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
});

const RequestForm = ({ close, className }: FormProps) => {
  return (
    <div className={className}>
      <Modal title="New Leave Requestx" close={close}>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
          }}
          validateOnMount
          validationSchema={RequestSchema}
          onSubmit={(values: Values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            close();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
            isValid,
          }) => (
            <>
              <div className="body">
                <form
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="form__group form__group--fw">
                    <div className="form__input-container">
                      <Input
                        hideLabel
                        label="name"
                        type="text"
                        name="name"
                        size="sm"
                        placeholder="Name*"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={!!(errors.name && touched.name)}
                        error={values.name}
                      />
                    </div>
                  </div>

                  <div className="form__group form__group--fw">
                    <div className="form__input-container">
                      <Input
                        hideLabel
                        label="email"
                        type="text"
                        name="email"
                        size="sm"
                        placeholder="email*"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        hasError={!!(errors.email && touched.email)}
                        error={values.email}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <Actions
                invalid={!isValid}
                onCancel={() => close()}
                onCreate={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

RequestForm.defaultProps = {
  className: "",
};
const StyledRequestForm = styled(RequestForm)`
  .body {
    display: flex;
    width: 100%;
    @include breakpoint(medium) {
      flex-wrap: wrap;
      flex-direction: column-reverse;
    }
  }
  .form {
    flex-grow: 1;
    margin-left: 15px;
    @include breakpoint(medium) {
      margin: 0 0 20px 0;
    }
  }
  .form__input-container {
    &:nth-child(1) {
      margin: 0 4% 30px 0;
      width: 48%;
    }
    &:nth-child(2) {
      margin-right: 0;
    }
  }
  input {
    display: block;

    @media screen and (max-width: 600) {
      display: flex;
    }
  }
  ${Button} {
    float: left;
  }
`;
export default StyledRequestForm;
