import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: sessionData } = useSession();
  return (
    <div className="sticky top-0 z-50 w-full bg-white p-2 shadow-md dark:bg-black">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2">
        <div className="w-fit">
          <Link href="/">
            <Image
              src="/aire.png"
              alt="aire"
              width={80}
              height={20}
              className="dark:invert"
            />
          </Link>

        </div>

        <div className='flex gap-4'>
          <p><a href="/generate">Generate</a></p>

          <p><a href="/upload-resume">Upload</a></p>

          <p><a href="/profile">Profile</a></p>
        </div>


        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="px-6"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
