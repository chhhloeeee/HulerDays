import Modal from '../modal';
import { Formik } from 'formik';
import Actions from '../Actions';
import StyledFormDatePicker from '../DatePicker';
import AdminFormSelectUnderline from './AdminFormSelectUnderline';
import AdminFormColumns from './AdminFormColumns';
import { useRouter } from 'next/router';
import { GetBusinessDatesCount } from '../helpers/helpers';

interface FormProps {
  close: () => void;
}

interface Values {
  id: number;
  requestType: string;
  startDate: Date;
  endDate: Date;
}

const RequestForm = ({ close }: FormProps) => {
  var date = new Date();
  var userId = 1;
  const router = useRouter();

  const updateLeave = async (values) => {
    var strStartDate = values.startDate.toString();
    var strEndDate = values.endDate.toString();
    let days = GetBusinessDatesCount(new Date(strStartDate), new Date(strEndDate));

    const formData: any = new FormData();
    formData.append('id', values.id);
    formData.append('days', days);

    var requestOptions = {
      method: 'PUT',
      body: formData,
      redirect: 'follow' as RequestRedirect,
      headers: { 'Auth-Token': "test" },
    };

    fetch('http://localhost:1234/removeHolidayDays?id=' + values.id + '&days=' + days, requestOptions)
      .then((response) => {
        postRequest(values);
        response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => {
        alert(error);
      });
  };

  const postRequest = async (values) => {
    var formdata = new FormData();
    formdata.append('requestType', values.requestType);
    formdata.append('startDate', values.startDate);
    formdata.append('endDate', values.endDate);
    formdata.append('userId', values.id);
    formdata.append('status', 'Pending');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow' as RequestRedirect,
    };

    fetch('http://localhost:1234/addRequest', requestOptions)
      .then((response) => {
        response.text();
        router.push('/manage');
      })
      .then((result) => console.log(result))
      .catch((error) => {
        console.log('error', error);
        alert('Something went wrong');
      });
  };

  const checkAllowance = (values) => {
    var strStartDate = values.startDate.toString();
    var strEndDate = values.endDate.toString();
    let days = GetBusinessDatesCount(new Date(strStartDate), new Date(strEndDate));

    if (days > 5) {
      return true;
    }
  };
  return (
    <Modal title='New Leave Request' close={close}>
      <Formik
        initialValues={{
          id: userId,
          requestType: 'Annual Leave',
          startDate: date,
          endDate: date,
        }}
        validateOnMount
        onSubmit={(values: Values, { setSubmitting, resetForm }) => {
          updateLeave(values);
          setSubmitting(false);
          setTimeout(() => {
            resetForm();
          }, 400);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input name='id' type='hidden' value={values.id} readOnly />
            <AdminFormColumns>
              <AdminFormSelectUnderline
                options={[
                  { value: 'Annual Leave', label: 'Annual Leave' },
                  { value: 'Sickness', label: 'Sickness' },
                ]}
                label='Request Type'
                value={values.requestType}
                setValue={(val: string) => setFieldValue('requestType', val)}
              />

              <StyledFormDatePicker
                label='Start Date'
                placeholder='Select a start date'
                value={values.startDate}
                setValue={(val: Date) => setFieldValue('startDate', val)}
              />

              <StyledFormDatePicker
                label='End Date'
                placeholder='Select an end date'
                value={values.endDate}
                setValue={(val: Date) => setFieldValue('endDate', val)}
              />
            </AdminFormColumns>

            <Actions onCancel={() => close()} onCreate={handleSubmit} invalid={checkAllowance(values)} />
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default RequestForm;
