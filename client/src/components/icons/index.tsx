import React, { FC } from "react";
import ChevronReactSelect from "./ChevronReactSelect";
import Close from "./Close";
import Logout from "./Logout";
import Delete from "./Delete";
import Edit from "./Edit";
import Check from "./Check";

interface IconProps {
  name: string;
}

const Icon: FC<IconProps> = ({ name }: IconProps) => {
  switch (name) {
    case "logout":
      return <Logout />;
    case "close":
      return <Close />;
    case "chevron-react-select":
      return <ChevronReactSelect />;
    case "delete":
      return <Delete />;
    case "edit":
      return <Edit />;
    case "check":
      return <Check />;
    default:
      return <div />;
  }
};

export const IconNameList = [
  "logout",
  "close",
  "chevrom-react-select",
  "delete",
  "edit",
  "check",
];

export default Icon;
