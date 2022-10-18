import Modal from "./modal";
import styled from "styled-components";

interface FormProps {
  close: () => void;
}
const RequestForm = ({ close }: FormProps) => {
  console.log("here");
  return (
    <Modal close={close}>
      <div>
        <h2>New Holiday Request</h2>
      </div>
    </Modal>
  );
};

const StyledRequestForm = styled(RequestForm)``;
export default StyledRequestForm;
