import Grid from "../components/grid";
import Footer from "../components/footer";
import HeadContainer from "src/components/HeadContainer";
import ContentWrapper from "src/components/ContentWrapper";
import styled from "styled-components";

interface HomeProps {
  className?: string;
}

const Home = ({ className }: HomeProps) => {
  return (
    <div className={className}>
      <ContentWrapper>
        <HeadContainer />
        <Grid />
        <Footer />
      </ContentWrapper>
    </div>
  );
};

const StyledHome = styled(Home)``;
export default StyledHome;
