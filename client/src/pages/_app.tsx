import type { AppProps } from "next/app";
import Head from "next/head";
import StyledLogo from "src/components/Logo";
import GlobalStyles from "src/styles/GlobalStyles";
import ThemeWrapper from "src/styles/ThemeWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeWrapper>
        <GlobalStyles />
        <Head>
          <title>HulerDays</title>
          <meta name="description" content="Welcome to Hulerdays" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ThemeWrapper>
    </>
  );
}

export default MyApp;