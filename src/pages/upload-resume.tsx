import { Button } from "~/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";
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
    parseResumeMutation.mutate({ resume: file_base64 });
    /*const response = await fetch(
      "http://localhost:5000/upload-file-to-cloud-storage",
      {
        method: "POST",
        body: formData,
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const responseWithBody = await response.json();
    if (!responseWithBody) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    setResponse(responseWithBody.body);*/
    // if (!encoding) return;
    // const form = new FormData();
    // form.append("providers", "affinda");
    // form.append("file", URL.createObjectURL(selectedFile));
    // form.append("fallback_providers", "");

    // const options = {
    //   method: "POST",
    //   url: "https://api.edenai.run/v2/ocr/resume_parser",
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmRlODQ3MjYtMGMyYi00N2VjLWFhNTktYzI4NjA2YjRlNjNiIiwidHlwZSI6ImFwaV90b2tlbiJ9.7ZzVqitjAtbt_gvcSOPr9Hi5pT7i9PfuORpV-jvt7UI",
    //     "Content-Type": "multipart/form-data;",
    //   },
    //   data: form,
    // };

    // axios
    //   .request(options)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  return (
    <div>
      <p className="mb-4 text-3xl font-bold">Upload Resume</p>
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
            <Button
              onClick={() => submitResume()}
              className="group relative flex items-center gap-2 text-center transition-transform duration-200 ease-in"
            >
              Send Resume
              <ArrowRight className="h-4 w-4 scale-0 opacity-0 transition-all duration-200 ease-in group-hover:block group-hover:scale-100 group-hover:opacity-100" />
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
