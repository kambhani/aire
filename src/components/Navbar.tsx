import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

type navLink = {
  title: string;
  path: string;
};

export default function Navbar() {
  const { data: sessionData } = useSession();
  const path = usePathname();
  const navLinks: navLink[] = [
    {
      title: "Generate",
      path: "/generate",
    },
    {
      title: "Upload",
      path: "/upload-resume",
    },
    {
      title: "Profile",
      path: "/profile",
    },
  ];
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

        <div className="flex gap-4">
          {navLinks.map((navLink) => (
            <p
              key={navLink.title}
              className={`font-semibold transition duration-100 ease-in hover:text-black dark:hover:text-white ${navLink.path == path ? "text-black" : "text-slate-500 dark:text-slate-400"}`}
            >
              <Link href={navLink.path}>{navLink.title}</Link>
            </p>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="px-6"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign Out" : "Sign In"}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
