import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import LandingResume from "~/components/landing/LandingResume";
import { Button } from "~/components/ui/button";
import Features from "~/components/landing/Features";

export default function Home() {
  return (
    <>
      <Head>
        <title>aire</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex grow flex-col">
        <div className="flex max-h-full grow flex-col items-center gap-8 align-middle md:flex-row md:justify-between md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col gap-4 text-center align-middle font-serif text-4xl font-bold md:text-left md:text-5xl"
          >
            <p className="leading-tight">
              Automatically tailor your resume{" "}
              <span className="bg-gradient-to-r from-black to-slate-400 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                to each job posting.
              </span>
            </p>

            <div className="font-sans font-semibold">
              <Link href="/auth/signin">
                <Button>Get Started</Button>
              </Link>
            </div>
          </motion.div>
          <LandingResume />
        </div>
        <div>
          <Features />
        </div>
      </main>
    </>
  );
}
