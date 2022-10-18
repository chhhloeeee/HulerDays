import Modal from "./modal";
import styles from "../styles/Home.module.css";

interface FormProps {
  close: () => void;
}
const RequestForm = ({ close }: FormProps) => {
  console.log("here");
  return (
    <Modal close={close}>
      <div className={styles.bodydiv}>
        <h2>Hello</h2>
      </div>
    </Modal>
  );
};

export default RequestForm;
