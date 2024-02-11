import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OpenAI } from "openai";
import { env } from "~/env";
<<<<<<< HEAD
var lescape = require('escape-latex');
=======
import vision from "@google-cloud/vision"
import {Storage} from "@google-cloud/storage"
import { google } from "@google-cloud/vision/build/protos/protos";
import fs from "fs"

>>>>>>> c5a494f42a4550ad54f0f383ca18cb152fbe5abb

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const googleAuthCredentials={
  projectId: process.env.GOOGLE_JSON_PROJECT_ID,
  credentials: {
    type: process.env.GOOGLE_JSON_TYPE,
    project_id: process.env.GOOGLE_JSON_PROJECT_ID,
    private_key_id: process.env.GOOGLE_JSON_PRIVATE_KEY_ID,
    private_key:process.env.GOOGLE_JSON_PRIVATE_KEY,
    client_email: process.env.GOOGLE_JSON_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_JSON_CLIENT_ID,
  }
}
const cloudStorage = new Storage(googleAuthCredentials);
const visionClient = new vision.ImageAnnotatorClient(googleAuthCredentials);

const resumeTemplate = (output: {
  metadata: {
    name: string | null;
    email: string | null;
    phone: string | null;
    skills: string | null;
    location: string | null;
    linkedin: string | null;
    github: string | null;
  } | null;
  education: {
    school: string;
    degree: string;
    timeframe: string;
  }[];
  projects: {
    name: string;
    technologies: string;
    timeframe: string;
    description: string;
  }[];
  experience: {
    company: string;
    role: string;
    location: string;
    timeframe: string;
    description: string;
  }[];
}) => {
  return String.raw`
%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \usepackage[sfdefault]{FiraSans}
% \usepackage[sfdefault]{roboto}
% \usepackage[sfdefault]{noto-sans}
% \usepackage[default]{sourcesanspro}

% serif
% \usepackage{CormorantGaramond}
% \usepackage{charter}


\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\begin{document}

%----------HEADING----------
% \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
%   \textbf{\href{http://sourabhbajaj.com/}{\Large Sourabh Bajaj}} & Email : \href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\
%   \href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\
% \end{tabular*}

\begin{center}
    \textbf{\Huge \scshape ${output.metadata?.name}} \\
    \Large{${output.metadata?.location}} \\
    \small ${output.metadata?.phone} $|$ \href{mailto:${output.metadata?.email}}{\underline{${output.metadata?.email}}} $|$ 
    \href{${output.metadata?.linkedin}}{\underline{${output.metadata?.linkedin?.replace(/(^\w+:|^)\/\//, "")}}} $|$
    \href{${output.metadata?.github}}{\underline{${output.metadata?.github?.replace(/(^\w+:|^)\/\//, "")}}}
\end{center}


%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    ${output.education
      .map((education) => {
        return String.raw`
      \resumeSubheading
        {${education.school}}{}
        {${education.degree}}{${education.timeframe}}
      `;
      })
      .join("")}
  \resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart

    ${output.experience
      .map((experience) => {
        return String.raw`
      \resumeSubheading
        {${experience.role}}{${experience.timeframe}}
        {${experience.company}}{${experience.location}}
        \resumeItemListStart
        ${experience.description.split("\n")
          .map((bullet) => {
            return String.raw`
            \resumeItem{${bullet}}
          `;
          })
          .join("")}
      \resumeItemListEnd`;
      })
      .join("")}

  \resumeSubHeadingListEnd


%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
      ${output.projects
        .map((project) => {
          return String.raw`
        \resumeProjectHeading
          {\textbf{${project.name}} $|$ \emph{${project.technologies}}}{${project.timeframe}}
          ${project.description.split("\n")
            .map((bullet) => {
              return String.raw`\resumeItem{${bullet}}`;
            })
            .join("")}
        `;
        })
        .join("")}
        \resumeItemListEnd
    \resumeSubHeadingListEnd



%
%-----------PROGRAMMING SKILLS-----------
\section{Technical Skills}
${output.metadata?.skills}


%-------------------------------------------
\end{document}
`;
};

const coverLetterTemplate = (output: {
  metadata: {
    name: string | null;
    email: string | null;
    phone: string | null;
    skills: string | null;
    location: string | null;
    linkedin: string | null;
    github: string | null;
  } | null;
  education: {
    school: string;
    degree: string;
    timeframe: string;
  }[];
  body: string;
}) => {
  return String.raw`
  %-------------------------
  % Entry-level Cover-letter Template in LaTeX
  % Made to go with "Entry-level Resume in laTeX" - here
  % Version - v1.0
  % Last Edits - October 5, 2021
  % Author : Jayesh Sanwal
  % Reach out to me on LinkedIn(/in/jsanwal), with any suggestions, ideas, issues, etc.
  %------------------------
  
  
  %%%%%%% --------------------------------------------------------------------------------------
  %%%%%%%  STARTING HERE, DO NOT TOUCH ANYTHING 
  %%%%%%% --------------------------------------------------------------------------------------
  
  %%%% Define Document type
  \documentclass[11pt,a4]{article}
  
  %%%% Include Packages
  \usepackage{latexsym}
  \usepackage[empty]{fullpage}
  \usepackage{titlesec}
   \usepackage{marvosym}
  \usepackage[usenames,dvipsnames]{color}
  \usepackage{verbatim}
  \usepackage[hidelinks]{hyperref}
  \usepackage{fancyhdr}
  \usepackage{multicol}
  \usepackage{hyperref}
  \usepackage{csquotes}
  \usepackage{tabularx}
  \hypersetup{colorlinks=true,urlcolor=black}
  \usepackage[11pt]{moresize}
  \usepackage{setspace}
  \usepackage[inline]{enumitem}
  \usepackage{ragged2e}
  \usepackage{anyfontsize}
  
  %%%% Set Margins
  \usepackage[margin=1cm]{geometry}
  
  %%%% Set Page Style
  \pagestyle{fancy}
  \fancyhf{} 
  \fancyfoot{}
  \renewcommand{\headrulewidth}{0pt}
  \renewcommand{\footrulewidth}{0pt}
  
  %%%% Set URL Style
  \urlstyle{same}
  
  %%%% Set Indentation
  \raggedbottom
  \raggedright
  \setlength{\tabcolsep}{0in}
  
  %%%% Set Secondary Color, Page Number Color, Footer Text
  \definecolor{UI_blue}{RGB}{32, 64, 151}
  \definecolor{HF_color}{RGB}{179, 179, 179}
  \rfoot{{\color{HF_color} \thepage \ of \ 1, Updated \today}}
  
  %%%% Set Heading Format
  \titleformat{\section}{
  \color{UI_blue} \scshape \raggedright \large 
  }{}{0em}{}[\vspace{-0.7cm} \hrulefill \vspace{-0.2cm}]
  %%%%%%% --------------------------------------------------------------------------------------
  %%%%%%% --------------------------------------------------------------------------------------
  %%%%%%%  END OF "DO NOT TOUCH" REGION
  %%%%%%% --------------------------------------------------------------------------------------
  %%%%%%% --------------------------------------------------------------------------------------
  
  
  
  \begin{document}
  %%%%%%% --------------------------------------------------------------------------------------
  %%%%%%%  HEADER
  %%%%%%% --------------------------------------------------------------------------------------
  \begin{center}
      \begin{minipage}[b]{0.24\textwidth}
              \large ${output.metadata?.phone} \\
              \large \href{mailto:${output.metadata?.email}}{${output.metadata?.email}} 
      \end{minipage}% 
      \begin{minipage}[b]{0.5\textwidth}
              \centering
              {\Huge ${output.metadata?.name}} \\ %
      \end{minipage}% 
      \begin{minipage}[b]{0.24\textwidth}
              \flushright \large
              {\href{${output.metadata?.linkedin}}{LinkedIn} } \\
              \href{${output.metadata?.github}}{GitHub}
      \end{minipage}   
      
  \vspace{-0.15cm} 
  {\color{UI_blue} \hrulefill}
  \end{center}
  
  \justify
  \setlength{\parindent}{0pt}
  \setlength{\parskip}{12pt}
  \vspace{0.2cm}
  \begin{center}
      {\color{UI_blue} \Large{COVER LETTER}}
  \end{center}
  
  
  %%%%%%% --------------------------------------------------------------------------------------
  %%%%%%%  First 2 Lines
  %%%%%%% --------------------------------------------------------------------------------------
  
  Date: \today \par \vspace{-0.1cm}
  Dear Hiring Manager, % OR To whom this may concern, 
  
  ${output.body}
  
  %%%%%%% --------------------------------------------------------------------------------------
  %%%%%%%  SIGNATURE
  %%%%%%% --------------------------------------------------------------------------------------
  
  \vspace{0.5cm}
  \raggedright
  Yours Faithfully \\ ${output.metadata?.name} \\ ${output.metadata?.phone} \\ \href{${output.metadata?.email}}{${output.metadata?.email}}
  
  \end{document}
  `;
};

export const resumeRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirstOrThrow({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          projects: true,
          educations: true,
          experiences: true,
          metadata: true,
        },
      });

      // make llm call with input.description and user
      const prompt = `I am trying to create a customized cover letter for a job posting. The job description is: 
      --- 
      
      ${input.description}

      --- 
      Additionally, all of my information is listed below:

      ${JSON.stringify(user)}

      Please respond with a cover letter formatted as plaintext. Please do not include a greeting or a closing. In other words, do not include the "dear ..." and do not include the "sincerely, ...".
      `;

      // const resp = await openai.chat.completions.create({
      //   messages: [{ role: "user", content: prompt }],

      //   model: "gpt-3.5-turbo",
      // });
      // const chatGPTCoverLetterString = resp?.choices[0]?.message.content;

      const chatGPTCoverLetterString = "tempalte cover lettetr, change before submitting"


      const response = {
        projects: [
          {
            name: "PlACEHOLDER Project 1 Name",
            technologies: "PlACEHOLDER Project 1 tech",
            timeframe: "PlACEHOLDER Project 1 timeline",
            description: "PlACEHOLDER Project 1 description",
          },
          {
            name: "PlACEHOLDER Project 2 Name",
            technologies: "PlACEHOLDER Project 2 tech",
            timeframe: "PlACEHOLDER Project 2 timeline",
            description: "PlACEHOLDER Project 2 description",
          },
          {
            name: "PlACEHOLDER Project 2 Name",
            technologies: "PlACEHOLDER Project 2 tech",
            timeframe: "PlACEHOLDER Project 2 timeline",
            description: "PlACEHOLDER Project 2 description",
          },
        ],
        experience: [
          {
            company: "PlACEHOLDER Experience 1 Name",
            role: "PlACEHOLDER Experience 1 Role",
            location: "PlACEHOLDER Experience 1 Location",
            timeframe: "PlACEHOLDER Experience 1 Timeframe",
            description: "PlACEHOLDER Experience 1 Description",
          },
          {
            company: "PlACEHOLDER Experience 2 Name",
            role: "PlACEHOLDER Experience 2 Role",
            location: "PlACEHOLDER Experience 2 Location",
            timeframe: "PlACEHOLDER Experience 2 Timeframe",
            description: "PlACEHOLDER Experience 2 Description",
          },
          {
            company: "PlACEHOLDER Experience 3 Name",
            role: "PlACEHOLDER Experience 3 Role",
            location: "PlACEHOLDER Experience 3 Location",
            timeframe: "PlACEHOLDER Experience 3 Timeframe",
            description: "PlACEHOLDER Experience 3 Description",
          },
        ],
      };

      // we need to make a thing
      const resumePrompt = `
        I am going to provide you my previous work experiences, my previous programming projects, and a job description. I want you to take my previous work experiences, my previous programming projects, and a job description and tell me which three previous work experiences to include and which three past programming projects to include on my resume that best fit the job description. The user object contains my previous work experience and my previous programming projects. Please place emphasis on choosing specific experiences and projects that best fit the job description. 

        You need to output the resume in the format below. Please replace each value in the JSON object with information from the user object. Each project and experience do not necessarily need to be related to each other. 

        ${JSON.stringify(response)}

        ---

        The user object is below:

        ${JSON.stringify(user)}

        ---

        The job description is below:

        ${input.description}
        
        ---

        Your entire answer MUST be in valid JSON format with the same keys as the provided resume format. Do not add any commentary/text before or after your JSON answer.
      `


      const resumeResp = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a professional resume maker." },
          { role: "user", content: resumePrompt }
        ],

        model: "gpt-4",
      });
      const chatGPTResume = resumeResp?.choices[0];

      console.log(chatGPTResume)

      const strResume = chatGPTResume.message.content.replace("&", "\\\\&").replace("•", "").replace("%", "\\\\%");

      // const strResume = chatGPTResume.message.content;

      const jsonResume = JSON.parse(strResume);

      const resumeInput = {
        ...jsonResume,
        metadata: user.metadata,
        education: user.educations,
        body:
          chatGPTCoverLetterString ??
          "Cover letter description could not be generated",
      };

      // console.log(resumeTemplate(resumeInput));

      const ret = {
        match: Math.floor(Math.random() * 50 + 50),
        suggestions: [
          "Expand on your projects section to showcase your skills to employers",
          "You do not need so many things in the awards section because it distracts from the overall point in your resume",
          "High school experiences are not always needed on a resume once you are in college, consider removing them",
        ],
        urls: [
          `data:application/x-tex;base64,${btoa(unescape(encodeURIComponent(resumeTemplate(resumeInput))))}`,
          `data:application/x-tex;base64,${btoa(unescape(encodeURIComponent(coverLetterTemplate(resumeInput))))}`,
        ],
      };

      return ret;
    }),

  parseResume: protectedProcedure
    .input(z.object({ resume: z.string().min(1), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
        if (!input.resume) return;
        const encoding : string | undefined = input.resume.split("base64")[1];
        if (!encoding) return;
        const buffer = Buffer.from(encoding, "base64");
        fs.writeFileSync(`./${input.name}.pdf`, buffer);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,
         
        // const [result] = visionClient.batchAnnotateFiles("./input.pdf");
        // const labels = result.textAnnotations;
        // labels.forEach(label => console.log(label.description));
        // res.status(200).json(labels[0].description);
              
        // const [result] = visionClient.batchAnnotateFiles(request);
        // // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        // console.log(result.responses[0].responses[0].fullTextAnnotation.text)
        // res.json({status: 200, body: result.responses[0].responses[0].fullTextAnnotation.text})
    }),
});
