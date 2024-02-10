import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="mx-auto w-full px-2 md:w-11/12">
      <Link href="/upload-resume">Upload resume</Link>
      <Link href="/profile">Edit profile information</Link>
      <Link href="/generate">Generate new resume</Link>
    </div>
  );
}
