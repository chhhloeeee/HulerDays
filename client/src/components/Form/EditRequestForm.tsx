import { Formik } from "formik";
import AdminFormColumns from "./AdminFormColumns";
import AdminFormSelectUnderline from "./AdminFormSelectUnderline";
import Modal from "../modal";
import Actions from "../Actions";

interface FormProps {
  close: () => void;
  reqType: string;
}

interface Values {
  requestType: string;
}

const EditRequestForm = ({ close, reqType }: FormProps) => {
  return (
    <div>
      <Modal title="Edit Leave Request" close={close}>
        <Formik
          initialValues={{
            requestType: reqType,
          }}
          validateOnMount
          onSubmit={(values: Values, { setSubmitting, resetForm }) => {
            //postRequest(values);
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
              </AdminFormColumns>

              <Actions onCancel={() => close()} onCreate={handleSubmit} />
            </>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default EditRequestForm;
