import { Formik } from 'formik';
import AdminFormColumns from './AdminFormColumns';
import AdminFormSelectUnderline from './AdminFormSelectUnderline';
import Modal from '../modal';
import Actions from '../Actions';

interface FormProps {
  close: () => void;
  reqType: string;
  id: number;
}

interface Values {
  requestType: string;
  leaveId: number;
}

const EditRequestForm = ({ close, reqType, id }: FormProps) => {
  const postUpdate = async (values) => {
    console.log(values);
    var formdata = new FormData();
    formdata.append('leaveId', values.leaveId);
    formdata.append('requestType', values.requestType);

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow' as RequestRedirect,
    };

    fetch('http://localhost:1234/updateRequest?leaveId=' + values.leaveId + '&requestType=' + values.requestType, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    close;
  };
  return (
    <div>
      <Modal title='Edit Leave Request' close={close}>
        <Formik
          initialValues={{
            requestType: reqType,
            leaveId: id,
          }}
          validateOnMount
          onSubmit={(values: Values, { setSubmitting, resetForm }) => {
            postUpdate(values);
            setSubmitting(false);
            setTimeout(() => {
              resetForm();
            }, 400);
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <>
              <AdminFormColumns>
                <input name='id' type='hidden' value={values.leaveId} readOnly />
                <AdminFormSelectUnderline
                  options={[
                    { value: 'Annual Leave', label: 'Annual Leave' },
                    { value: 'Sickness', label: 'Sickness' },
                  ]}
                  label='Request Type'
                  value={values.requestType}
                  setValue={(val: string) => setFieldValue('requestType', val)}
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
