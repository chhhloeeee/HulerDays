/* eslint-disable react/no-danger */
import { useEffect, useRef, useCallback, MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import Button from "../Button";
import AdminFormColumns from "./AdminFormColumns";
import AdminFormSelectUnderline from "./AdminFormSelectUnderline";
import { Formik } from "formik";
import Icon from "../icons";

interface EditRequestModalProps {
  className?: string;
  reqType: string;
  id: number;
  cancel: (event: MouseEvent) => void;
}

interface Values {
  requestType: string;
  leaveId: number;
}

const EditRequestModal = ({
  className,
  reqType,
  id,
  cancel,
}: EditRequestModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  console.log(id, "leaveid");
  console.log(reqType);

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

  const postUpdate = async (values) => {
    console.log(values);
    var formdata = new FormData();
    formdata.append("leaveId", values.leaveId);
    formdata.append("requestType", values.requestType);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow" as RequestRedirect,
    };

    fetch(
      "http://localhost:1234/updateRequest?leaveId=" +
        values.leaveId +
        "&requestType=" +
        values.requestType,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    cancel;
  };

  return (
    <div className={className}>
      <div ref={modalRef}>
        <h1>
          <button
            type="button"
            className="icon-button"
            aria-label="Go Back"
            onClick={cancel}
          >
            <Icon name="close" />
          </button>
          Edit Request Type
        </h1>

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <AdminFormColumns>
                <input
                  name="id"
                  type="hidden"
                  value={values.leaveId}
                  readOnly
                />
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

              <div>
                <Button darkOutline type="button" onClick={cancel}>
                  Cancel
                </Button>

                <Button primary type="submit" onClick={() => handleSubmit()}>
                  Confirm
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const StyledEditRequestModal = styled(EditRequestModal)`
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
  margin: 0 !important;

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

    div + div {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: 1rem;
      bottom: 1rem;

      margin: 0 !important;
      @media screen and (max-width: 750) {
        margin-bottom: 0;
      }
      ${Button} {
        :first-child {
          margin-right: 1rem;
        }
      }
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
