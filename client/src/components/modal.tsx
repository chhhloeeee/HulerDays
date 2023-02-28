/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useRef, useEffect, RefObject } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Icon from "./icons";

export interface ModalProps {
  className?: string;
  children: React.ReactNode;
  close: () => void;
  title?: string;
  smallTitle?: boolean;
  excludeFromCloseClick?: RefObject<HTMLElement>[];
}

const Modal = ({
  className,
  children,
  close,
  title,
  excludeFromCloseClick,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Handle click outside of the modal
    const handleClick = (e: MouseEvent) => {
      // The number here correlates to the width of the scrollbar (set in the styling below)
      if (window.innerWidth - e.pageX <= 9) return;
      let shouldClose = true;
      // Loop through exclude ref array and check if the click is in there
      if (excludeFromCloseClick && excludeFromCloseClick.length > 0) {
        excludeFromCloseClick.map((el: RefObject<HTMLElement>) => {
          if (el.current && el.current.contains(e.target as Node))
            shouldClose = false;
        });
      }
      if (modalRef.current && modalRef.current.contains(e.target as Node))
        shouldClose = false;
      if (shouldClose) close();
    };
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => document.removeEventListener("mousedown", handleClick);
  }, [close]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={className}
      >
        <motion.div
          initial={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 30 }}
          ref={modalRef}
        >
          <h1>
            <button
              type="button"
              className="icon-button"
              aria-label="Go Back"
              onClick={close}
            >
              <Icon name="close" />
            </button>
            {title && title}
          </h1>
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

Modal.defaultProps = {
  className: "",
  bottomNav: null,
};

interface StyledModalProps {
  narrow?: boolean;
  transparent?: boolean;
  minHeight?: boolean;
  wide?: boolean;
  noMobilePadding?: boolean;
  noCloseIcon?: boolean;
}

const StyledModal = styled(Modal)<StyledModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(30px);
  z-index: 1;
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

    ${(props) =>
      props.narrow &&
      `
      max-width: 590px;
      padding: 0 40px;

  

      > h1 {
        top: -3rem;
      }
    `}

    ${(props) => props.minHeight && `min-height: 650px;`}

    ${(props) => props.wide && `max-width: 950px;`}
    
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
    ${(props) =>
      props.smallTitle &&
      `
        font-size: 18px;
    `}

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
      ${(props) => props.noCloseIcon && `display: none;`}
    }
  }
`;

export default StyledModal;
