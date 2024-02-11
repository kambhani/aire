import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { signIn, getProviders } from "next-auth/react";
import { FaDiscord } from 'react-icons/fa';


const mapper = {
  "Discord": <FaDiscord className='mr-2 text-xl' />
}

export default function SignIn({
  providers,
}: {
  providers: { name: string; id: string }[]; // Prob more fields but this is all that's need to make TS happy
}) {
  return (
    <div className='text-center'>
      <h1 className="text-xl font-bold mt-8">Sign In to Aire</h1>
      <p className='text-slate-400 max-w-md mx-auto'>If you do not already have an account, one will automatically be made for you.</p>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)} className='mt-8'>
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
