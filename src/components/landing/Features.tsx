import { ReactElement } from "react";
import { FileIcon, ServerCogIcon, UserRoundIcon } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const features: Feature[] = [
  {
    title: "Upload Resume",
    description: "Get your resume info parsed and saved to your account",
    icon: <FileIcon className="h-5 w-5" />,
  },
  {
    title: "Add more experiences",
    description:
      "On your profile page, add any additional projects and experiences that aren't on your resume",
    icon: <UserRoundIcon className="h-5 w-5" />,
  },
  {
    title: "Generate a tailored resume",
    description:
      "Paste a job description and generate a resume tailored to that descripiton.",
    icon: <ServerCogIcon className="h-5 w-5" />,
  },
];

export default function Features() {
  return (
    <div className="mx-auto my-24 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
      {features.map((feature) => (
        <div
          className="mx-auto flex w-full max-w-sm flex-col gap-2"
          key={feature.title}
        >
          <div className="grid w-fit place-items-center rounded-full bg-black/10 p-2">
            {feature.icon}
          </div>
          <p className="font-semibold">{feature.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
