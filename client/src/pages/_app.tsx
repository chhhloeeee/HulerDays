import type { AppProps } from "next/app";
import GlobalStyles from "src/styles/GlobalStyles";
import ThemeWrapper from "src/styles/ThemeWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeWrapper>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeWrapper>
    </>
  );
}

export default MyApp;
