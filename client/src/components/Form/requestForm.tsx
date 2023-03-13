import Modal from "../modal";
import styled from "styled-components";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Actions from "../Actions";
import StyledFormDatePicker from "../DatePicker";
import AdminFormSelectUnderline from "./AdminFormSelectUnderline";
import AdminFormColumns from "./AdminFormColumns";

interface FormProps {
  close: () => void;
  className?: string;
}

interface Values {
  requestType: string;
  startDate: Date;
  endDate: Date;
}

const RequestSchema = Yup.object().shape({
  lastName: Yup.string().required("Required"),
});

const RequestForm = ({ close, className }: FormProps) => {
  return (
    <Modal title="New Leave Request" close={close}>
      <Formik
        initialValues={{
          requestType: "annualLeave",
          startDate: new Date(),
          endDate: new Date(),
        }}
        validateOnMount
        validationSchema={RequestSchema}
        onSubmit={(values: Values, { setSubmitting, resetForm }) => {
          alert(JSON.stringify(values, null, 2));
          close();
          setSubmitting(false);
          resetForm();
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
              <AdminFormColumns>
                <AdminFormSelectUnderline
                  options={[
                    { value: "annualLeave", label: "Annual Leave" },
                    { value: "sickness", label: "Sickness" },
                  ]}
                  label="Request Type"
                  value={values.requestType}
                  setValue={(val: string) => setFieldValue("requestType", val)}
                />

                <StyledFormDatePicker
                  label="Start Date"
                  placeholder="Select a start date"
                  value={values.startDate}
                  setValue={(val: Date) => setFieldValue("startDate", val)}
                />

                <StyledFormDatePicker
                  label="End Date"
                  placeholder="Select an end date"
                  value={values.endDate}
                  setValue={(val: Date) => setFieldValue("endDate", val)}
                />
              </AdminFormColumns>

              <Actions onCancel={() => close()} onCreate={handleSubmit} />
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
const StyledRequestForm = styled(RequestForm)``;
export default StyledRequestForm;
