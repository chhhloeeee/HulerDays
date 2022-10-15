import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Icon from "../icons";

interface HomeProps{
  className: string;
}

const Home = ({className}<HomeProps>) => {
  return (
    <div className={className}>
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

        <div className={styles.grid}>
          <div className={styles.card}>
            <Image
              src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14085410/Lifestyle9.jpg"
              alt="calendar"
              width="271.11"
              height="271.11"
            />
            <div className={styles.textWrapper}>
              <h2>Request Leave &rarr;</h2>
            </div>
          </div>

          <div className={styles.card}>
            <Image
              src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090345/Office12.jpg"
              alt="calendar"
              width="271.11"
              height="271.11"
            />
            <div className={styles.textWrapper}>
              <h2>Manage Requests &rarr;</h2>
            </div>
          </div>

          <div className={styles.card}>
            <Image
              src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090344/Office11.jpg"
              alt="calendar"
              width="271.11"
              height="271.11"
            />
            <div className={styles.textWrapper}>
              <h2>Calendar View &rarr;</h2>
            </div>
          </div>

          <div className={styles.card}>
            <Image
              src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090343/Office10.jpg"
              alt="calendar"
              width="271.11"
              height="271.11"
            />
            <div className={styles.textWrapper}>
              <h2>Policies &rarr;</h2>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
