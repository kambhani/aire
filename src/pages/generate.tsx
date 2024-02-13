import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { Progress } from "~/components/ui/progress";
import { ExternalLink } from "lucide-react";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";

export default function Generate() {
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 500;
      setProgress((count / (45 * 1000)) * 100);
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  function hslToRgb(h: number, s: number, l: number) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  function hueToRgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  function numberToColorHsl(i: number) {
    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value
    const hue = (i * 1.2) / 360;
    // we convert hsl to rgb (saturation 100%, lightness 50%)
    const rgb = hslToRgb(hue, 1, 0.5);
    // we format to css value and return
    // return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    return rgbToHex(rgb[0] ?? 0, rgb[1] ?? 0, rgb[2] ?? 0);
  }

  function componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  // text-[rgb()]

  return (
    <>
      <title>Generate Resume | aire</title>
      {!submitted && (
        <div className="mx-auto mt-8 grid w-full">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold">Job Description</h1>
            <p className=" mt-2 text-sm text-slate-400">
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
              onClick={() => {
                generateMutation.mutate({
                  description: description,
                });

                setLoading(true);
              }}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>

            {loading ? <Progress value={progress} className="mt-2" /> : <></>}
          </div>
        </div>
      )}

      {submitted && generateMutation.data && (
        <div className="mt-8">
          <div>
            <h1 className="text-2xl font-bold">
              Current Resume Match:{" "}
              <span
                className={`text-3xl`}
                style={{
                  color: numberToColorHsl(Number(generateMutation.data.match)),
                }}
              >
                {generateMutation.data.match}%
              </span>
            </h1>
            <div className="mx-auto mt-4 grid w-full grid-cols-1 gap-16 sm:grid-cols-2">
              <div>
                <h1 className="text-xl font-bold">Suggestions</h1>
                <ul className="ml-8 mt-2 list-disc">
                  {generateMutation.data.suggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="text-xl font-bold">Generated Resume</h1>
                <p className="mt-2 text-sm text-slate-400">
                  The resume and cover letter are written in LaTeX and can be
                  accessed via the links below
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <form
                    action="https://www.overleaf.com/docs"
                    method="post"
                    target="_blank"
                  >
                    <input
                      className="hidden"
                      type="text"
                      name="snip_uri"
                      value={generateMutation.data.urls[0]}
                    />
                    <Button
                      size="sm"
                      type="submit"
                      variant="default"
                      className="flex items-center gap-2"
                    >
                      Open Resume
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </form>
                  <form
                    action="https://www.overleaf.com/docs"
                    method="post"
                    target="_blank"
                  >
                    <input
                      className="hidden"
                      type="text"
                      name="snip_uri"
                      value={generateMutation.data.urls[1]}
                    />
                    <Button
                      size="sm"
                      type="submit"
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      Open Cover Letter
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Button onClick={() => setSubmitted(false)}>
                    Enter another job description
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
