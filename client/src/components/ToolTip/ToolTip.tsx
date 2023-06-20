import { useState } from 'react';
import Icon from '../icons';
import ToolTipButton from './ToolTipButton';

interface ToolTipProps {
  message?: string;
  position?: 'above-left' | 'above-right' | 'left' | 'right';
  inline?: boolean;
}

const ToolTip = ({ message, position, inline }: ToolTipProps) => {
  const [active, setActive] = useState(false);
  return (
    <ToolTipButton inline={inline} position={position} active={active} onClick={() => setActive(!active)} onKeyDown={() => setActive(!active)}>
      <Icon name='info' />
      <span>{message}</span>
    </ToolTipButton>
  );
};

export default ToolTip;
