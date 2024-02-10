import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { toast } from "sonner";

export default function Generate() {
  const { data: sessionData } = useSession();
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userText, setUserText] = useState("");

  const generateMutation = api.resume.generate.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setSubmitted(true);
      setLoading(false);
    },
    onError: () => {
      toast("Generation failed");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

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

            <Button
              className="bg-black"
              onClick={() =>
                generateMutation.mutate({
                  description: description,
                })
              }
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      )}

      {submitted && generateMutation.data && (
        <div className="mx-auto mt-24 grid w-full grid-cols-1 gap-16 px-8 sm:grid-cols-2">
          <div>
            <h1 className="text-xl font-bold">
              Current resume match:{" "}
              <span className="text-3xl text-red-600">
                {generateMutation.data.match}%
              </span>
            </h1>

            <h1 className="mt-4 text-xl font-bold">Suggestions</h1>
            <ul className="ml-8 mt-2 list-disc">
              {generateMutation.data.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
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
                  href={generateMutation.data.urls[0]}
                  className="text-blue-400"
                >
                  {generateMutation.data.urls[0]}
                </a>
              </li>

              <li>
                <span className="font-bold">Generated Cover Letter: </span>
                <a
                  href={generateMutation.data.urls[1]}
                  className="text-blue-400"
                >
                  {generateMutation.data.urls[1]}
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
    </>
  );
}
