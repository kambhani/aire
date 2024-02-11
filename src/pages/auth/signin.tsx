import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { signIn, getProviders } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export default function SignIn({
  providers,
}: {
  providers: { name: string; id: string }[]; // Prob more fields but this is all that's need to make TS happy
}) {
  return (
    <div className="text-center">
      <h1 className="mt-8 text-xl font-bold">Sign In to Aire</h1>
      <p className="mx-auto max-w-md text-slate-400">
        If you do not already have an account, one will automatically be made
        for you.
      </p>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)} className="mt-8">
            {mapper[provider.name]} Sign in with {provider.name}
          </Button>
        </div>
      ))}
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

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
};
