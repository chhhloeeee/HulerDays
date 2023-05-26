/* eslint-disable react/no-danger */
import { useEffect, useRef, useCallback, MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import Button from "../Button";
import AdminFormColumns from "./AdminFormColumns";
import AdminFormSelectUnderline from "./AdminFormSelectUnderline";
import { Formik } from "formik";

interface ConfirmationDialogProps {
  className?: string;
  reqType: string;
  cancel: (event: MouseEvent) => void;
}

interface Values {
  requestType: string;
}

const EditRequestModal = ({
  className,
  reqType,
  cancel,
}: ConfirmationDialogProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside of the modal
  const handleClick = useCallback(
    (e) => {
      if (modalRef.current && modalRef.current.contains(e.target)) return;
      // outside click
      if (cancel) cancel(e);
    },
    [cancel]
  );

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handleClick]);

  return (
    <div className={className}>
      <div ref={modalRef}>
        <div>
          <h1>Edit Request Type</h1>

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
                    setValue={(val: string) =>
                      setFieldValue("requestType", val)
                    }
                  />
                </AdminFormColumns>

                <Button primaryOutline onClick={cancel}>
                  Cancel
                </Button>

                <Button primary type="submit" onClick={() => handleSubmit}>
                  Confirm
                </Button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

interface StyledConfirmationDialogProps {
  primaryTitle?: boolean;
}

const StyledEditRequestModal = styled(
  EditRequestModal
)<StyledConfirmationDialogProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: -5rem;
  left: -2.8rem;
  backdrop-filter: blur(4px);
  background: var(--modal-container);
  z-index: ${(props) => props.theme.zLayers.important};
  > div {
    width: 500px;
    min-height: 300px;
    background-color: var(--modal-inner);
    color: #fff;
    border-radius: 10px;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    position: absolute;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    ${(props) =>
      props.primaryTitle &&
      `
      h1 {
        color: var(--primary-color);
        fill: var(--primary-color);
      }
      `}

    h1 {
      width: 100%;
      text-align: center;
      font-size: 24px;
      margin-bottom: 10px;
    }
    p {
      width: 100%;
      margin-bottom: 20px;
    }
    ${Button} {
      margin: 5px !important;
      min-width: 100px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.medium}) {
    > div {
      width: calc(100% - 40px);
    }
  }
`;

export default StyledEditRequestModal;
