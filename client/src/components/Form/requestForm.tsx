import Modal from "../modal";
import { Formik } from "formik";
import Actions from "../Actions";
import StyledFormDatePicker from "../DatePicker";
import AdminFormSelectUnderline from "./AdminFormSelectUnderline";
import AdminFormColumns from "./AdminFormColumns";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const btn = document.querySelector("button");

  const postRequest = async (values) => {
    const XHR = new XMLHttpRequest();
    const formData = new FormData();

    // Push our data into our FormData object
    for (const [] of Object.entries(values)) {
      formData.append("requestType", values.requestType);
      formData.append(
        "startDate",
        values.startDate.toLocaleDateString("en-gb")
      );
      formData.append("endDate", values.endDate.toLocaleDateString("en-gb"));
      formData.append("userId", "2");
      formData.append("status", "Pending");
    }

    // Define what happens on successful data submission
    XHR.addEventListener("load", (e) => {
      router.push("/manage");
    });

    // Define what happens in case of an error
    XHR.addEventListener("error", (e) => {
      alert("Oops! Something went wrong.");
    });

    // Set up our request
    XHR.open("POST", "http://localhost:1234/addRequest");

    // Send our FormData object; HTTP headers are set automatically
    XHR.send(formData);
  };

  btn.addEventListener("click", () => {
    postRequest({ test: "ok" });
  });

  return (
    <Modal title="New Leave Request" close={close}>
      <Formik
        initialValues={{
          requestType: "Annual Leave",
          startDate: date,
          endDate: date,
        }}
        validateOnMount
        onSubmit={(values: Values, { setSubmitting, resetForm }) => {
          postRequest(values);
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
                  { value: "Annual Leave", label: "Annual Leave" },
                  { value: "Sickness", label: "Sickness" },
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
