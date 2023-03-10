import styled from "styled-components";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={className}>
      <Image
        src="https://cdn.huler.io/v2/wp-content/uploads/2021/11/12130402/huler-logo.svg"
        alt="hulerLogo"
        width="100"
        height="50"
      />
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
