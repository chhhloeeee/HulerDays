import React, { FC } from 'react';
import ChevronReactSelect from './ChevronReactSelect';
import Close from './Close';
import Logout from './Logout';
import Delete from './Delete';
import Edit from './Edit';

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
    default:
      return <div />;
  }
};

export const IconNameList = ['logout', 'close'];

export default Icon;
