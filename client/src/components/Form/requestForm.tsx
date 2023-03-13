import Modal from "../modal";
import { Formik } from "formik";
import Actions from "../Actions";
import StyledFormDatePicker from "../DatePicker";
import AdminFormSelectUnderline from "./AdminFormSelectUnderline";
import AdminFormColumns from "./AdminFormColumns";

interface FormProps {
  close: () => void;
}

interface Values {
  requestType: string;
  startDate: Date;
  endDate: Date;
}

const RequestForm = ({ close }: FormProps) => {
  return (
    <Modal title="New Leave Request" close={close}>
      <Formik
        initialValues={{
          requestType: "annualLeave",
          startDate: new Date(),
          endDate: new Date(),
        }}
        validateOnMount
        onSubmit={(values: Values, { setSubmitting, resetForm }) => {
          alert("create pressed");
          close();
          setSubmitting(false);
          setTimeout(() => {
            resetForm();
          }, 400);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
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
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default RequestForm;
