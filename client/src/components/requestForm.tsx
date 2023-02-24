import Modal from "./modal";
import styled from "styled-components";
import { Field, Formik } from "formik";
import Input from "./Input";
import * as Yup from "yup";
import Actions from "./Actions";
import StyledFormDatePicker from "./DatePicker";
import AdminFormSelectUnderline from "./AdminFormSelectUnderline";

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
        {({ handleSubmit, isValid, values, setFieldValue }) => (
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
                  <AdminFormSelectUnderline
                    options={[
                      { value: "", label: "None selected" },
                      { value: "annualLeave", label: "Annual Leave" },
                      { value: "sickness", label: "Sickness" },
                    ]}
                    placeholder="Select option"
                    label="Request Type"
                    value={values.requestType}
                    setValue={(val: string) =>
                      setFieldValue("requestType", val)
                    }
                  />
                </div>
              </div>

              <div className="form__group form__group--fw">
                <div className="form__input-container">
                  <Field
                    name="startDate"
                    label="Start Date"
                    as={StyledFormDatePicker}
                  />
                </div>
              </div>
              <div className="form__group form__group--fw">
                <div className="form__input-container">
                  <Field
                    name="endDate"
                    label="End Date"
                    as={StyledFormDatePicker}
                  />
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
