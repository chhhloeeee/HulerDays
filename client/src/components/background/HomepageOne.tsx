import styled from 'styled-components';

interface Props {
  className?: string;
}

const HomepageOne = ({ className }: Props) => (
  <svg className={className} viewBox='0 0 234 92' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M234 30.5355C199.122 11.0884 158.977 0 116.295 0C74.1863 0 34.5477 10.7822 0 29.7348V90.6912C32.2476 65.9312 72.58 51.2 116.295 51.2C160.649 51.2 201.522 66.3655 234 91.7846V30.5355Z'
      fill='url(#paint0_linear)'
    />
    <defs>
      <linearGradient id='paint0_linear' x1='-3.18127e-07' y1='92' x2='234' y2='94.5' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#E7ECFE' />
        <stop offset='0.633811' stopColor='#9E91F7' />
        <stop offset='1' stopColor='#ECA8FE' />
      </linearGradient>
    </defs>
  </svg>
);

HomepageOne.defaultProps = {
  className: '',
};

const StyledHomepageOne = styled(HomepageOne)`
  position: absolute;
  width: 150vw;
  top: -2%;
  left: -25vw;
  z-index: -1;
  transform: rotate(-5deg);

  @media (min-width: 500) {
    width: 100%;
    left: 0;
    top: -10%;
  }

  @media (min-width: 1000) {
    top: -25%;
  }
`;

export default StyledHomepageOne;
