import styled from 'styled-components';

interface Props {
  className?: string;
}

const AboutTwo = ({ className }: Props) => (
  <svg className={className} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 1529 600'>
    <path
      fill='url(#paint0_linear_8_3)'
      d='M0 400.116c227.899 127.041 490.214 199.477 769.107 199.477 275.143 0 534.153-70.436 759.893-194.246V7.143c-210.71 161.747-474.25 257.98-759.893 257.98C479.289 265.123 212.217 166.053 0 0v400.116z'
    />
    <defs>
      <linearGradient id='paint0_linear_8_3' x1='1529' x2='0' y1='-1.407' y2='-17.747' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#DFD6E8' />
        <stop offset='0.302' stopColor='#D4A9CD' />
        <stop offset='0.667' stopColor='#F16C74' />
        <stop offset='1' stopColor='#F66E6B' />
      </linearGradient>
    </defs>
  </svg>
);

AboutTwo.defaultProps = {
  className: '',
};

const StyledAboutTwo = styled(AboutTwo)`
  position: absolute;
  width: 150vw;
  bottom: -2%;
  left: -25vw;
  z-index: ${(props) => props.theme.zLayers.behind};
  transform: rotate(10deg);

  @media (min-width: 500) {
    width: 100%;
    left: 0;
  }

  @media (min-width: 750) {
    bottom: -10%;
  }
`;

export default StyledAboutTwo;
