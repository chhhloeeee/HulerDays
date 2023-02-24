import React, { FC } from "react";
import Close from "./Close";
import Logout from "./Logout";

interface IconProps {
  name: string;
}

const Icon: FC<IconProps> = ({ name }: IconProps) => {
  switch (name) {
    case "logout":
      return <Logout />;
    case "close":
      return <Close />;
    default:
      return <div />;
  }
};

export const IconNameList = ["logout", "close"];

export default Icon;
