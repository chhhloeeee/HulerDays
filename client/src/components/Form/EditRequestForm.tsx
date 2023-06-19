import { Formik } from 'formik';
import AdminFormColumns from './AdminFormColumns';
import AdminFormSelectUnderline from './AdminFormSelectUnderline';
import Modal from '../modal';
import Actions from '../Actions';
import { useEffect, useState } from 'react';
import ConfirmationDialog from '../ConfirmationDialog';

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
  const [confirmation, setConfirmation] = useState({});
  const [editRequest, setEditRequest] = useState(false);

  const postUpdate = async (values) => {
    var formdata = new FormData();
    formdata.append('leaveId', values.leaveId);
    formdata.append('requestType', values.requestType);
    formdata.append('status', 'Pending');

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow' as RequestRedirect,
    };

    fetch('http://localhost:1234/updateRequest?leaveId=' + values.leaveId + '&requestType=' + values.requestType + '&status=Pending', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    window.location.reload();
    return close();
  };

  return (
    <Modal title='Edit Leave Request' close={close}>
      <Formik
        initialValues={{
          requestType: reqType,
          leaveId: id,
        }}
        validateOnMount
        onSubmit={(values: Values, { setSubmitting, resetForm }) => {
          setConfirmation(values);
          setEditRequest(true);
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
      {editRequest && (
        <ConfirmationDialog
          title='Confirm Action'
          message='Are you sure you want to edit this request?'
          confirm={() => postUpdate(confirmation)}
          cancel={() => setEditRequest(false)}
        />
      )}
    </Modal>
  );
};

export default EditRequestForm;
