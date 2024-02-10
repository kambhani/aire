import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type AppType } from "next/app";
import { Toaster } from "~/components/ui/sonner";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <div className="mx-auto flex min-h-screen flex-col">
          <div className="flex min-h-screen grow flex-col">
            <Navbar />
            <div className="mx-auto flex w-full max-w-7xl grow flex-col p-4">
              <Component {...pageProps} />
            </div>
          </div>
          <Toaster />
          <Footer />
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
