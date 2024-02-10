import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function Profile() {
  const { data: sessionData } = useSession();

  return (
    <>
      <h1 className="my-8 text-center text-4xl font-semibold">
        Profile Information
      </h1>
      <h2 className="mx-auto px-2 text-2xl text-blue-800 dark:text-blue-200 md:w-11/12">
        Metadata
      </h2>
      <div className="mx-auto grid w-full grid-cols-1 gap-4 px-2 md:w-11/12 lg:grid-cols-2 2xl:grid-cols-3">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="name">
            Name
          </Label>
          <Input type="text" id="name" placeholder="FirstName LastName" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="location">
            Location
          </Label>
          <Input type="text" id="location" placeholder="City, State" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="email">
            Email
          </Label>
          <Input type="email" id="email" placeholder="email@email.com" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="phone">
            Phone
          </Label>
          <Input type="tel" id="phone" placeholder="+1" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="linkedin">
            LinkedIn
          </Label>
          <Input
            type="url"
            id="linkedin"
            placeholder="https://www.linkedin.com/in/"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="github">
            GitHub
          </Label>
          <Input type="url" id="github" placeholder="https://github.com/" />
        </div>
      </div>
      <div className="mx-auto mt-4 px-2 md:w-11/12">
        <Button variant="success">Save changes</Button>
      </div>
      <div className="mx-auto mt-8 px-2 md:w-11/12">
        <h2 className="text-2xl text-blue-800 dark:text-blue-200">
          Experience
        </h2>
      </div>
    </>
  );
}
