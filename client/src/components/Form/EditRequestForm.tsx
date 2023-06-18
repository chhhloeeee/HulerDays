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
  const [confirmation, setConfirmation] = useState([]);
  const [editRequest, setEditRequest] = useState(false);
  let test = '';

  const postUpdate = async (values) => {
    console.log('here');
    console.log(values, 'final');
    return;
    var formdata = new FormData();
    formdata.append('leaveId', values[0]);
    formdata.append('requestType', values[1]);
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

  const confirmationPending = async (values) => {
    setConfirmation(
      values.map((value) => ({
        leaveId: value.leaveId,
        requestType: value.requestType,
      })),
    );

    console.log(values, 'in pending');
    // setConfirmation(values);
    test = values.leaveId;
    console.log(test);
    console.log(confirmation, 'confo');
    setEditRequest(true);
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
            console.log(values, 'here');
            confirmationPending(values);
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
      {editRequest && (
        <ConfirmationDialog
          title='Confirm Action'
          message='Are you sure you want to edit this request?'
          confirm={() => postUpdate(confirmation)}
          cancel={() => setEditRequest(false)}
        />
      )}
    </div>
  );
};

export default EditRequestForm;
