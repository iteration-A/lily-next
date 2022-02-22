import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Error from "next/error";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default MyApp;
