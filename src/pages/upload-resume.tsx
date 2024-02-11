import { Button } from "~/components/ui/button";
import { ArrowRight, Send, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import OpenAI from "openai";
import { env } from "~/env";
import { api } from "~/utils/api";
import { redirect } from "next/navigation";

export default function UploadResume() {
  const utils = api.useUtils();
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null,
  );
  const parseResumeMutation = api.resume.parseResume.useMutation({
    onSuccess: () => {
      void utils.invalidate();
      console.log("success");
    },
  });
  async function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }
  const [encoding, setEncoding] = useState<string>();
  const [url, setUrl] = useState<string>("");
  const [response, setResponse] = useState<string>();
  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result) return;
      if (typeof reader.result !== "string") return;
      setEncoding(reader.result);
    };
  };
  async function submitResume() {
    const formData = new FormData();
    if (!selectedFile) return;
    formData.append("file", selectedFile);
    const file_base64 = (await getBase64(selectedFile)) as string;
    parseResumeMutation.mutate({
      resume: file_base64,
      name: selectedFile.name,
    });
  }

  return (
    <div>
      <p className="mx-auto mb-4 mt-8 w-full max-w-xl text-2xl font-bold">
        Upload Resume
      </p>
      <div className="flex flex-col gap-4">
        {encoding && selectedFile && (
          <div className="mx-auto hidden w-full max-w-xl md:block">
            <embed src={encoding} width="576px" height="500px" />
            <p>{selectedFile.name}</p>
          </div>
        )}
        {!selectedFile ? (
          <>
            <div className="mx-auto grid aspect-[5/4] w-full max-w-xl items-center rounded-md bg-slate-100 dark:bg-slate-900">
              <div className="flex flex-col items-center gap-4 font-semibold dark:opacity-80">
                <Upload className="h-16 w-16 opacity-50" />
                <p className="opacity-50">No File Selected</p>
                <label
                  htmlFor="file-upload"
                  className="mx-auto flex w-fit cursor-pointer flex-col items-center gap-2 rounded-md bg-black px-4 py-2 text-center font-semibold text-white opacity-100  dark:bg-white dark:text-black"
                >
                  Browse Files
                </label>
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto w-fit">
            <Button
              onClick={() => submitResume()}
              className="group relative flex items-center gap-2 text-center transition-transform duration-100 ease-in"
            >
              <p>Send Resume</p>
              <ArrowRight className="h-4 w-4 transition-all duration-100 ease-in group-hover:translate-x-1" />
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
