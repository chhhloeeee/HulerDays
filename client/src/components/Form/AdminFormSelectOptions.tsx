import { motion } from 'framer-motion';
import styled from 'styled-components';
import { scrollStyling } from 'src/styles/mixins';

const AdminFormSelectOptions = styled(motion.ul)`
  box-shadow: 0 6px 12px #0000004d;
  background: var(--select-options-background);
  padding: 15px 20px;
  border-radius: 15px;
  position: relative;
  top: 10px;
  z-index: ${(props) => props.theme.zLayers.dropdown};
  max-height: 300px;
  overflow-y: auto;
  ${scrollStyling};

  p {
    margin-bottom: 0;
  }

  li + li {
    margin-top: 10px;
  }
`;

AdminFormSelectOptions.defaultProps = {
  animate: { y: 0, opacity: 1 },
  initial: { y: 5, opacity: 0 },
  exit: { y: 5, opacity: 0 },
  transition: { stiffness: 0, duration: 0.2 },
};

export default AdminFormSelectOptions;
