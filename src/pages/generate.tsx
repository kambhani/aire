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
  const [loading, setLoading] = useState(false);

  const [userText, setUserText] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <title>Generate Resume | aire</title>
      {!submitted && (
        <div className="mx-auto mt-24 grid w-full px-8">
          <div className="mx-auto">
            <h1 className="text-xl font-bold">Job Description</h1>
            <p className=" text-sm text-slate-400">
              Please copy and paste the job description for the posting you have
              found below
            </p>
            <Textarea
              className="mx-auto mb-4 mt-4 h-80 max-w-xl"
              placeholder="enter the job description here..."
              value={description}
              onChange={(newDescription) =>
                setDescription(newDescription.target.value)
              }
            />

            <p className="text-lg font-bold">Or, enter the job posting URL:</p>

            <Input
              className="mx-auto mb-4 mt-4 max-w-xl"
              placeholder="https://www.example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Button className="bg-black" onClick={handleSubmit}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="mx-auto mt-24 grid w-full grid-cols-1 gap-16 px-8 sm:grid-cols-2">
          <div>
            <h1 className="text-xl font-bold">
              Current resume match:{" "}
              <span className="text-3xl text-red-600">18%</span>
            </h1>

            <h1 className="mt-4 text-xl font-bold">Suggestions</h1>
            <ul className="ml-8 mt-2 list-disc">
              <li>
                Expand on your projects section to showcase your skills to
                employers
              </li>
              <li>
                You do not need so many things in the awards section because it
                distracts from the overall point in your resume
              </li>
              <li>
                High school experiences are not always needed on a resume once
                you are in college, consider removing them
              </li>
            </ul>

            <div className="ml-2">
              <Input
                className="mx-auto mb-4 mt-4 max-w-xl"
                placeholder="Ask a follow up question..."
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold">Generated Resume</h1>
            <p className="mt-2 text-sm text-slate-400">
              Generated resume and cover letters are written in LaTeX and can be
              accessed via the links below
            </p>

            <ul className="ml-8 mt-2 list-disc">
              <li>
                <span className="font-bold">Generated Resume: </span>
                <a
                  href="https://www.overleaf.com/latex/templates/swe-resume-template/bznbzdprjfyy"
                  className="text-blue-400"
                >
                  https://www.overleaf.com/latex/templates/swe-resume-template/bznbzdprjfyy
                </a>
              </li>

              <li>
                <span className="font-bold">Generated Cover Letter: </span>
                <a
                  href="https://www.overleaf.com/latex/templates/swe-resume-template/bznbzdprjfyy"
                  className="text-blue-400"
                >
                  https://www.overleaf.com/latex/templates/swe-resume-template/bznbzdprjfyy
                </a>
              </li>
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Button onClick={() => setSubmitted(false)}>
                Enter another job description
              </Button>
              <Button variant="secondary" onClick={() => setSubmitted(false)}>
                Regenerate resume
              </Button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}
