import React, { FC } from 'react';
import ChevronReactSelect from './ChevronReactSelect';
import Close from './Close';
import Logout from './Logout';
import Delete from './Delete';
import Edit from './Edit';
import Check from './Check';
import Info from './Info';

interface IconProps {
  name: string;
}

const Icon: FC<IconProps> = ({ name }: IconProps) => {
  switch (name) {
    case 'logout':
      return <Logout />;
    case 'close':
      return <Close />;
    case 'chevron-react-select':
      return <ChevronReactSelect />;
    case 'delete':
      return <Delete />;
    case 'edit':
      return <Edit />;
    case 'check':
      return <Check />;
    case 'info':
      return <Info />;
    default:
      return <div />;
  }
};

export const IconNameList = ['logout', 'close', 'chevron-react-select', 'delete', 'edit', 'check', 'info'];

export default Icon;
