import Head from "next/head";
import "../styles/globals.css";
import Layout from "../utils/components/layout/Layout";
import { NotificationContextProvider } from "../store/NotificationContext";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Trying Next.JS</title>
          <meta
            name="description"
            content="Trying features of Next.JS like routing, server side rendering, static props, head and metadata, among others."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
