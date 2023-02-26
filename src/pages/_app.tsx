import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import SubscribeContext from "../components/store/SubscribeContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <SubscribeContext>
          <Component {...pageProps} />
        </SubscribeContext>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
