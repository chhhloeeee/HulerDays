import Modal from "./modal";
import styled from "styled-components";
import StyledButton from "./Button";

interface FormProps {
  close: () => void;
}
const RequestForm = ({ close }: FormProps) => {
  console.log("here");
  return (
    <Modal close={close}>
      <div>
        <h2>Hello</h2>
      </div>
    </Modal>
  );
};

const StyledRequestForm = styled(RequestForm)``;
export default StyledRequestForm;
