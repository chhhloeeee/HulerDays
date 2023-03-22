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
  var date = new Date();

  const postRequest = async (values) => {
    //e.preventDefault();
    const response = await fetch("http://localhost:1234/addRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(response);
    if (!response.ok) {
      alert("Something went wrong");
      return;
    }
    alert("Loan created");
    close();
  };
  return (
    <Modal title="New Leave Request" close={close}>
      <Formik
        initialValues={{
          requestType: "annualLeave",
          startDate: date,
          endDate: date,
        }}
        validateOnMount
        onSubmit={(values: Values, { setSubmitting, resetForm }) => {
          postRequest(values);
          //close();
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
