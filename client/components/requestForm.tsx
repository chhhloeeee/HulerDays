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
  name: string;
  lastName: string;
  email: string;
}

const RequestSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
});

const RequestForm = ({ close }: FormProps) => {
  return (
    <Modal close={close}>
      <div>
        <h2>New Holiday Request</h2>
        <Formik
          initialValues={{
            name: "",
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
              close();
            }, 500);
          }}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form>
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

              <Input
                hideLabel
                label="lastName"
                type="text"
                name="lastName"
                size="sm"
                placeholder="Last Name*"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!(errors.lastName && touched.lastName)}
                error={values.lastName}
              />
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

              <Button primaryOutline type="submit">
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
