import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={className}>
      <Link href='/home'>
        <Image src='https://cdn.huler.io/v2/wp-content/uploads/2021/11/12130402/huler-logo.svg' alt='hulerLogo' width='100' height='50' priority />
      </Link>
    </div>
  );
};

const StyledLogo = styled(Logo)`
  position: absolute;
  left: 2rem;
  top: 1rem;
  Image {
    width: 100px;
    height: 50px;
  }
`;

export default StyledLogo;
