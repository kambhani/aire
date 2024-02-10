import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: sessionData } = useSession();

  return (
    <div className="">
      <h2 className="text-3xl">Name</h2>
      <span className="">
        {sessionData ? sessionData.user.name : "No name"}
      </span>
      <h2 className="text-3xl">Email</h2>
      <span className="">
        {sessionData ? sessionData.user.email : "No email"}
      </span>
    </div>
  );
}
