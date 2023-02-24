import Head from "next/head";
import Image from "next/image";
import Icon from "../components/icons";
import Grid from "../components/grid";
import Footer from "../components/footer";
import styled from "styled-components";

interface HomeProps {
  className?: string;
}

const Home = ({ className }: HomeProps) => {
  return (
    <div className={className}>
      <Head>
        <title>HulerDays</title>
        <meta name="description" content="Welcome to Hulerdays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div>
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2021/11/12130402/huler-logo.svg"
            alt="hulerLogo"
            width="100"
            height="50"
          ></Image>
        </div>
        <button type="button">
          <Icon name="logout" />
        </button>
        <main>
          <h1>
            Welcome to <strong>HulerDays</strong>
          </h1>
          <div className="head">
            <p>Days Remaining: </p>
          </div>
        </main>
        <Grid />
        <Footer />
      </div>
    </div>
  );
};

const StyledHome = styled(Home)`
  .container {
    padding: 0 2rem;
    background: #efeeee;
    min-height: 100vh;
  }

  Image {
    width: 100px;
    height: 50px;
  }

  button {
    position: absolute;
    right: 0;
    margin-right: 10px;
    background: transparent;
    border: none;
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
