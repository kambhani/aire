import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen flex-col">
        <div className="grow">
          <Navbar />
          <div>
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
