import React, { FC } from "react";
import Logout from "./Logout";

interface IconProps {
  name: string;
}

const Icon: FC<IconProps> = ({ name }: IconProps) => {
  switch (name) {
    case "logout":
      return <Logout />;
    default:
      return <div />;
  }
};

export const IconNameList = ["logout"];

export default Icon;
