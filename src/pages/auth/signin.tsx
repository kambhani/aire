import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="text-center">
      <h1 className="mt-8 text-xl font-bold">Sign In to Aire</h1>
      <p className="mx-auto max-w-md text-slate-400">
        If you do not already have an account, one will automatically be made
        for you.
      </p>
      <Button onClick={() => signIn("discord")} className="mt-8">
        <FaDiscord className="mr-2 text-xl" /> Sign in with Discord
      </Button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
