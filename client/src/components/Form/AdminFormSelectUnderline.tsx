import { AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import AdminFormSelectOptions from "./AdminFormSelectOptions";
import Icon from "../icons";
import AdminFormSelectUnderlineOptionButton from "./AdminFormSelectOptionButton";
import { SelectOption } from "../icons/type";
import AdminFormSelectUnderlineButton from "./AdminFormSelectUnderlineButton";

interface AdminFormSelectUnderlineProps {
  className?: string;
  options: SelectOption[];
  label: string;
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
}

const AdminFormSelectUnderline = ({
  className,
  options,
  label,
  placeholder,
  value,
  setValue,
}: AdminFormSelectUnderlineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Handle click outside of the modal
    const handleClick = (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const valuesLabel = options.find((option) => option.value === value)?.label;

  return (
    <div className={className} ref={ref}>
      <span>{label}</span>
      <AdminFormSelectUnderlineButton onClick={() => setIsOpen(!isOpen)}>
        {valuesLabel || placeholder}
        <Icon name="chevron-react-select" />
      </AdminFormSelectUnderlineButton>
      <AnimatePresence>
        {isOpen && (
          <AdminFormSelectOptions>
            {options.length < 1 && (
              <li>
                <span>No Options Available</span>
              </li>
            )}
            {options.map((option) => (
              // eslint-disable-next-line react/jsx-key
              <li>
                <AdminFormSelectUnderlineOptionButton
                  active={value === option.value}
                  onClick={() => {
                    setValue(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </AdminFormSelectUnderlineOptionButton>
              </li>
            ))}
          </AdminFormSelectOptions>
        )}
      </AnimatePresence>
    </div>
  );
};

const StyledAdminFormSelectUnderline = styled(AdminFormSelectUnderline)`
  position: relative;
  > span {
    font-size: 14px;
    letter-spacing: 0px;
    color: #b8b8b8;
    font-weight: 500;
    margin-bottom: 10px;
    display: block;
  }
  ul {
    span {
      font-size: 12px;
      color: var(--contrast);
      opacity: 0.8;
    }
  }
`;

export default StyledAdminFormSelectUnderline;
