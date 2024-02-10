import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { signIn, getProviders } from "next-auth/react";

export default function SignIn({
  providers,
}: {
  providers: { name: string; id: string }[]; // Prob more fields but this is all that's need to make TS happy
}) {
  return (
    <div>
      <h1 className="mb-8 text-5xl">Sign In</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
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
