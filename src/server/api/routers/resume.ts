import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OpenAI } from "openai";
import { env } from "~/env";
import PdfParse from "pdf-parse";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

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
        ${experience.description
          .split("\n")
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
          \resumeItemListStart
          ${project.description
            .split("\n")
            .map((bullet) => {
              return String.raw`\resumeItem{${bullet}}`;
            })
            .join("")}
            \resumeItemListEnd
        `;
        })
        .join("")}
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

      const resp = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],

        model: "gpt-3.5-turbo",
      });
      const chatGPTCoverLetterString = resp?.choices[0]?.message.content;

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
      `;

      const resumeResp = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a professional resume maker." },
          { role: "user", content: resumePrompt },
        ],

        model: "gpt-4",
      });
      const chatGPTResume = resumeResp?.choices[0];

      const strResume = chatGPTResume?.message.content
        ?.replaceAll("&", "\\\\&")
        .replaceAll("•", "")
        .replaceAll("%", "\\\\%");

      const jsonResume: typeof response = strResume
        ? (JSON.parse(strResume) as typeof response)
        : response;

      const resumeInput = {
        ...jsonResume,
        metadata: user.metadata,
        education: user.educations,
        body:
          chatGPTCoverLetterString ??
          "Cover letter description could not be generated",
      };

      // NOW WE NEED TO CALCULATE SCORE
      const scoreResponse = {
        score: "50",
        improvements: [
          "PLACEHOLDER FOR IMPROVEMENT 1",
          "PLACEHOLDER FOR IMPROVEMENT 2",
          "PLACEHOLDER FOR IMPROVEMENT 3",
          "PLACEHOLDER FOR IMPROVEMENT 4",
          "PLACEHOLDER FOR IMPROVEMENT 5",
          "PLACEHOLDER FOR IMPROVEMENT 6",
        ],
      };

      const scorePrompt = `
        I am going to provde to you my previous work experiences, my previous programming projects, and a job description. I want you to take my previous work experiences, my previous programming projects, and a job description and tell me a score out of 100 of how well my work experiences and programming projects match the job description, and list of suggestions on how I can improve my work experiences and programming projects to better match the job description.

        
        You need to output the score and suggestions for improvement in the format below. Please replace each value in the JSON object with your answers.
      
        ${JSON.stringify(scoreResponse)}

        ---

        The user object is below:

        ${JSON.stringify(user)}

        ---

        The job description is below:

        ${input.description}
        
        ---

        Your entire answer MUST be in valid JSON format with the same keys as the provided resume format. Do not add any commentary/text before or after your JSON answer.
    `;

      const scoreResp = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a professional resume maker." },
          { role: "user", content: scorePrompt },
        ],

        model: "gpt-3.5-turbo",
      });
      const scoreText = scoreResp?.choices[0]?.message.content;

      const scoreJSON = scoreText
        ? (JSON.parse(scoreText) as typeof scoreResponse)
        : scoreResponse;

      // console.log(resumeTemplate(resumeInput));

      const ret = {
        match: scoreJSON.score,
        suggestions: scoreJSON.improvements,
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
      const encoding: string | undefined = input.resume.split("base64")[1];
      if (!encoding) return;
      const buffer = Buffer.from(encoding, "base64");
      await PdfParse(buffer).then(async function (data) {
        const text = data.text;
        const prompt = `
          Format the following text in JSON format, according to the following resumeSchema. The output MUST be valid JSON; make sure keys have unique titles:

          resumeSchema = {
            metadata: {
              name?: String;
              location?: String;
              email?: String;
              phone?: String;
              linkedin?: String;
              github?: String;
            }
            education: {
              school: String;
              degree: String;
              timeframe: String;
            }[];
            experience: {
              company: String;
              role: String;
              location: String;
              timeframe: String;
              description: String;
            }[];
            projects: {
              name: String;
              technologies: String;
              timeframe: String;
              description: String;
            }[];
            skills: String;
          }

          text:
          ${text}
          `;
        const resp = await openai.chat.completions.create({
          messages: [{ role: "user", content: prompt }],

          model: "gpt-3.5-turbo",
        });
        const output = resp.choices[0]?.message.content;
        if (!output) return;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type ChatGPTJSON = {
          metadata: {
            name?: string;
            location?: string;
            email?: string;
            phone?: string;
            linkedin?: string;
            github?: string;
          };
          education: {
            school?: string;
            degree?: string;
            timeframe?: string;
          }[];
          experience: {
            company?: string;
            role?: string;
            location?: string;
            timeframe?: string;
            description?: string;
          }[];
          projects: {
            name?: string;
            technologies?: string;
            timeframe?: string;
            description?: string;
          }[];
          skills?: string;
        };

        const json = JSON.parse(output) as ChatGPTJSON;

        // Delete all previous data from the user
        await ctx.db.project.deleteMany({
          where: {
            userId: ctx.session.user.id,
          },
        });
        await ctx.db.experience.deleteMany({
          where: {
            userId: ctx.session.user.id,
          },
        });
        await ctx.db.education.deleteMany({
          where: {
            userId: ctx.session.user.id,
          },
        });
        await ctx.db.metadata.deleteMany({
          where: {
            userId: ctx.session.user.id,
          },
        });

        // Add new data
        await ctx.db.metadata.create({
          data: {
            name: json?.metadata?.name?.substring(0, 150),
            location: json?.metadata?.location?.substring(0, 150),
            email: json?.metadata?.email?.substring(0, 150),
            linkedin: json?.metadata?.linkedin?.substring(0, 150),
            github: json?.metadata?.github?.substring(0, 150),
            skills: json?.skills?.substring(0, 150),
            userId: ctx.session.user.id.substring(0, 150),
          },
        });
        await ctx.db.education.createMany({
          data: json.education.map((education) => {
            return {
              school: education.school
                ? education.school.substring(0, 150)
                : "",
              degree: education.degree
                ? education.degree.substring(0, 150)
                : "",
              timeframe: education.timeframe
                ? education.timeframe.substring(0, 150)
                : "",
              userId: ctx.session.user.id,
            };
          }),
        });
        await ctx.db.experience.createMany({
          data: json.experience.map((experience) => {
            return {
              company: experience.company
                ? experience.company.substring(0, 150)
                : "",
              role: experience.role ? experience.role.substring(0, 150) : "",
              location: experience.location
                ? experience.location.substring(0, 150)
                : "",
              description: experience.description ? experience.description : "",
              timeframe: experience.timeframe
                ? experience.timeframe.substring(0, 150)
                : "",
              userId: ctx.session.user.id,
            };
          }),
        });
        await ctx.db.project.createMany({
          data: json.projects.map((project) => {
            return {
              name: project.name ? project.name.substring(0, 150) : "",
              technologies: project.technologies
                ? project.technologies.substring(0, 150)
                : "",
              timeframe: project.timeframe
                ? project.timeframe.substring(0, 150)
                : "",
              description: project.description ? project.description : "",
              userId: ctx.session.user.id,
            };
          }),
        });

        console.log(json);
        return {
          redirect: "/profile",
        };
      });
    }),
});
