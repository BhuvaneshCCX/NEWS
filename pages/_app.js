import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BURROW NEWS</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
