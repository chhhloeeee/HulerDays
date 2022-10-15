import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>HulerDays</title>
        <meta name="description" content="Welcome to Hulerdays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Image
          src="https://cdn.huler.io/v2/wp-content/uploads/2021/11/12130402/huler-logo.svg"
          alt="hulerLogo"
          width="100"
          height="50"
        ></Image>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <strong>HulerDays</strong>
        </h1>

        <div className={styles.head}>
          <p>Days to take: </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Request Leave &rarr;</h2>
          </div>

          <div className={styles.card}>
            <h2>Manage Requests &rarr;</h2>
          </div>

          <div className={styles.card}>
            <h2>Calendar View &rarr;</h2>
          </div>

          <div className={styles.card}>
            <h2>Policies &rarr;</h2>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
