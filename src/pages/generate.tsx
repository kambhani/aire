import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Generate() {
  const { data: sessionData } = useSession();
  const [description, setDescription] = useState("");

  return (
    <div className="mx-auto mt-12 grid w-full grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:w-11/12">
      <div className="">
        <h2 className="mb-4 text-4xl">Paste job description here</h2>
        <Textarea
          className="mb-4 h-80 w-full"
          value={description}
          onChange={(newDescription) =>
            setDescription(newDescription.target.value)
          }
        />
        <Button>Generate Resume</Button>
      </div>
      <div className="h-80 w-full">
        <h2 className="mb-4 text-4xl">Resume + cover letter here</h2>
        <div className="h-80 w-full border border-slate-900 dark:border-slate-100">
          outputted resume goes here
        </div>
      </div>
    </div>
  );
}
