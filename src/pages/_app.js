import "@/styles/globals.css";
import Head from "next/head";

// Change's Site Icon
<Head>
  <link rel="shortcut icon" href="/favicon.ico" />
</Head>;

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
