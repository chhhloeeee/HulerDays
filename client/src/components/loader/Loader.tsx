import styled from 'styled-components';
import LoaderSvg from './Loader.svg';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={className}>
      <div>
        <img src={LoaderSvg.src} alt='Loading Spinner' />
      </div>
    </div>
  );
};

Loader.defaultProps = {
  className: '',
};

interface StyledLoaderProps {
  hasBg?: boolean;
  fullscreen?: boolean;
}

interface StyledLoaderProps {
  small?: boolean;
}

const StyledLoader = styled(Loader)<StyledLoaderProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  ${(props) =>
    props.small &&
    `
    width: 100%;
    height: 100%;
    position: absolute;
  `}
  top: 0;
  left: 0;
  z-index: ${(props) => props.theme.zLayers.globalUi};
  background: #ffffff33;

  > div {
    width: 80px;
  }
`;

export default StyledLoader;
