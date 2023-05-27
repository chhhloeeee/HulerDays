/* eslint-disable react/no-danger */
import { useEffect, useRef, useCallback, MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import Button from "../Button";
import AdminFormColumns from "./AdminFormColumns";
import AdminFormSelectUnderline from "./AdminFormSelectUnderline";
import { Formik } from "formik";

interface EditRequestModalProps {
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
}: EditRequestModalProps) => {
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

interface StyledEditRequestModalProps {
  primaryTitle?: boolean;
}

const StyledEditRequestModal = styled(
  EditRequestModal
)<StyledEditRequestModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(30px);
  z-index: ${(props) => props.theme.zLayers.modal};
  display: flex;
  overflow: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 9px;
  }

  scrollbar-width: 9px;

  > div {
    background: #fff;
    max-width: 750px;
    width: 100%;
    margin: auto;
    border-radius: 10px;
    position: relative;
    padding: 60px;

    &.itemForm {
      width: 886px;
    }
  }

  > div > h1 {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    text-align: center;
    width: 100%;

    button {
      margin-right: 42px;
      cursor: pointer;
      svg {
        width: 16px;
        height: 16px;
        * {
          fill: black;
        }
      }
    }
  }
`;

export default StyledEditRequestModal;
