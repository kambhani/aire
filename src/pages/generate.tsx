import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Generate() {
  const { data: sessionData } = useSession();
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto mt-24 grid w-full px-8">

      {
        !submitted && (
          <div className='mx-auto'>
            <h1 className='text-xl font-bold'>Job Description</h1>
            <p className=' text-slate-400 text-sm'>Please copy and paste the job description for the posting you have found below</p>
            <Textarea
              className="mb-4 h-80 max-w-xl mx-auto mt-4"
              placeholder="enter the job description here..."
              value={description}
              onChange={(newDescription) =>
                setDescription(newDescription.target.value)
              }
            />


            <p className='text-lg font-bold'>Or, enter the job posting URL:</p>

            <Input
              className="mb-4 max-w-xl mx-auto mt-4"
              placeholder="https://www.example.com"
              value={description}
              onChange={(newURL) =>
                setUrl(newURL.target.value)
              }
            />


            <Button className='bg-black'>Submit</Button>






          </div>


        )
      }
      {/* <div className="">
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
      </div> */}
    </div>
  );
}
