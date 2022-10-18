import Modal from "./modal";
import styled from "styled-components";
import { Form, Formik, FormikHelpers } from "formik";
import Button from "./Button";
import Input from "./Input";
import * as Yup from "yup";

interface FormProps {
  close: () => void;
}

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const RequestSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
});

const RequestForm = ({ close }: FormProps) => {
  console.log("here");
  return (
    <Modal close={close}>
      <div>
        <h2>New Holiday Request</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          validateOnMount
          validationSchema={RequestSchema}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
          }) => (
            <Form>
              <Input
                hideLabel
                label="name"
                type="text"
                name="name"
                size="sm"
                placeholder="Name*"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!(errors.firstName && touched.firstName)}
                error={values.firstName}
              />
              <Input
                hideLabel
                label="lastname"
                type="text"
                name="lastname"
                size="sm"
                placeholder="Last Name*"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!(errors.lastName && touched.lastName)}
                error={values.lastName}
              />

              <Button
                primaryOutline
                type="submit"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const StyledRequestForm = styled(RequestForm)``;
export default StyledRequestForm;
