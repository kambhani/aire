import { Button } from "~/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function UploadResume() {
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null,
  );
  const [encoding, setEncoding] = useState<string>();
  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setSelectedFile(e.target.files[0]);
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result) return;
      if (typeof reader.result !== "string") return;
      setEncoding(reader.result);
    };
  };
  console.log(encoding);

  /* when user wants to choose another image */
  const fileResetHandler = () => {
    setSelectedFile(null);
  };
  return (
    <div>
      <p className="mb-4 text-5xl font-bold">Upload Resume</p>
      <div className="flex flex-col gap-4">
        {encoding && selectedFile && (
          <div className="mx-auto hidden w-full max-w-xl md:block">
            <embed src={encoding} width="576px" height="500px" />
            <p>{selectedFile.name}</p>
          </div>
        )}
        {!selectedFile ? (
          <label
            htmlFor="file-upload"
            className="mx-auto flex w-fit cursor-pointer items-center gap-2 rounded-md bg-black px-4 py-2 text-center font-semibold text-white dark:bg-white dark:text-black"
          >
            Upload Resume
            <Upload className="h-4 w-4" />
          </label>
        ) : (
          <div className="mx-auto w-fit">
            <Button className="group flex items-center gap-2 transition-all duration-200 ease-in">
              Send Resume{" "}
              <ArrowRight className="hidden h-4 w-4 opacity-0 transition-all duration-200 ease-in group-hover:block group-hover:opacity-100" />
            </Button>
          </div>
        )}

        <input
          className="hidden"
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
