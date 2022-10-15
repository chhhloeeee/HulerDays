import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Icon from "../components/icons";
import Grid from "components/grid";

const Home = () => {
  return (
    <>
      <Head>
        <title>HulerDays</title>
        <meta name="description" content="Welcome to Hulerdays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div>
          <Image
            src="https://cdn.huler.io/v2/wp-content/uploads/2021/11/12130402/huler-logo.svg"
            alt="hulerLogo"
            width="100"
            height="50"
          ></Image>
        </div>

        <button className={styles.logout} type="button">
          <Icon name="logout" />
        </button>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <strong>HulerDays</strong>
          </h1>

          <div className={styles.head}>
            <p>Days to take: </p>
          </div>
        </main>

        <Grid />

        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default Home;
