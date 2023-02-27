import Grid from "../components/grid";
import Footer from "../components/footer";
import HeadContainer from "src/components/HeadContainer";
import ContentWrapper from "src/components/ContentWrapper";

const Home = () => {
  return (
    <div>
      <ContentWrapper>
        <HeadContainer />
        <Grid />
        <Footer />
      </ContentWrapper>
    </div>
  );
};

export default Home;
