import React, { FC } from "react";
import ChevronReactSelect from "./ChevronReactSelect";
import Close from "./Close";
import Logout from "./Logout";
import Remove from "./Remove";

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
    case "remove":
      return <Remove />;
    default:
      return <div />;
  }
};

export const IconNameList = ["logout", "close"];

export default Icon;
