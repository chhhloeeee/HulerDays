import Modal from "./modal";
import styled from "styled-components";
import { Field, Formik } from "formik";
import Input from "./Input";
import * as Yup from "yup";
import Actions from "./Actions";
import StyledFormDatePicker from "./DatePicker";

interface FormProps {
  close: () => void;
  className?: string;
}

interface Values {
  requestType: string;
  startDate: string;
  endDate: string;
}

const RequestSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
});

const RequestForm = ({ close, className }: FormProps) => {
  return (
    <Modal title="New Leave Request" close={close}>
      <Formik
        initialValues={{
          requestType: "annualLeave",
          startDate: "",
          endDate: "",
        }}
        validateOnMount
        validationSchema={RequestSchema}
        onSubmit={(values: Values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          close();
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isValid }) => (
          <div className={className}>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="form__group form__group--fw">
                <div className="form__input-container">
                  <label>Request Type</label>
                  <Field as="select" name="requestType">
                    <option value="annualLeave">Annual Leave</option>
                    <option value="sickness">Sickness</option>
                  </Field>
                </div>
              </div>

              <div className="form__group form__group--fw">
                <div className="form__input-container">
                  <label>Start Date</label>
                  <Field name="startDate" as={StyledFormDatePicker} />
                </div>
              </div>
              <div className="form__group form__group--fw">
                <div className="form__input-container">
                  <label>End Date</label>
                  <Field name="endDate" as={StyledFormDatePicker} />
                </div>
              </div>
              <Actions
                invalid={!isValid}
                onCancel={() => close()}
                onCreate={handleSubmit}
              />
            </form>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

RequestForm.defaultProps = {
  className: "",
};
const StyledRequestForm = styled(RequestForm)`
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
    font-family: sofia-pro, sans-serif;

    @media screen and (max-width: 600) {
      display: flex;
    }
  }
`;
export default StyledRequestForm;
