import "../styles/globals.css";
import Provider from "@context/Provider";
import { getSession } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (context) => {
  return {
    pageProps: {
      session: await getSession(context.ctx),
    },
  };
};

export default MyApp;
