import type { AppProps } from "next/app";
import GlobalStyles from "styles/GlobalStyles";
import ThemeWrapper from "styles/ThemeWrapper";

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
