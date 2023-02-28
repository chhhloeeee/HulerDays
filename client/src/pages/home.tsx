import Grid from "../components/grid";
import Footer from "../components/footer";
import ContentWrapper from "src/components/ContentWrapper";
import styled from "styled-components";
import Logo from "src/components/Logo";
import Icon from "src/components/icons";

interface HomeProps {
  className?: string;
}

const Home = ({ className }: HomeProps) => {
  return (
    <div className={className}>
      <ContentWrapper>
        <div className="container">
          <Logo />
          <button type="button">
            <Icon name="logout" />
          </button>
          <main>
            <h1>Welcome to HulerDays</h1>
            <div className="head">
              <p>Days Remaining: </p>
            </div>
          </main>
        </div>
        <Grid />
        <Footer />
      </ContentWrapper>
    </div>
  );
};

const StyledHome = styled(Home)`
  button {
    position: absolute;
    right: 2rem;
    top: 2rem;
    background: transparent;
    cursor: pointer;
    svg {
      width: 30px;
      height: 30px;
      fill: #8e8e90;
    }
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    margin: 0;
    position: relative;
    top: 0;
    padding-bottom: 3rem;
    line-height: 1.15;
    font-size: 4rem;
    color: #fb6666;
    text-align: center;
  }

  .head {
    font-size: 1.5rem;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 15px;
    width: 400px;
    margin-bottom: 3rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    p {
      margin: 1rem 2rem 1rem;
    }
  }
`;
export default StyledHome;
