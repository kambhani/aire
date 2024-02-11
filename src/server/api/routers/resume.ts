import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OpenAI } from "openai";
import { env } from "~/env";

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
    ${output.education.map((education) => {
      return String.raw`
      \resumeSubheading
        {${education.school}}{}
        {${education.degree}}{${education.timeframe}}
      `;
    })}
  \resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart

    \resumeSubheading
      {Undergraduate Research Assistant}{June 2020 -- Present}
      {Texas A\&M University}{College Station, TX}
      \resumeItemListStart
        \resumeItem{Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems}
        \resumeItem{Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data}
        \resumeItem{Explored ways to visualize GitHub collaboration in a classroom setting}
      \resumeItemListEnd
      
% -----------Multiple Positions Heading-----------
%    \resumeSubSubheading
%     {Software Engineer I}{Oct 2014 - Sep 2016}
%     \resumeItemListStart
%        \resumeItem{Apache Beam}
%          {Apache Beam is a unified model for defining both batch and streaming data-parallel processing pipelines}
%     \resumeItemListEnd
%    \resumeSubHeadingListEnd
%-------------------------------------------

    \resumeSubheading
      {Information Technology Support Specialist}{Sep. 2018 -- Present}
      {Southwestern University}{Georgetown, TX}
      \resumeItemListStart
        \resumeItem{Communicate with managers to set up campus computers used on campus}
        \resumeItem{Assess and troubleshoot computer problems brought by students, faculty and staff}
        \resumeItem{Maintain upkeep of computers, classroom equipment, and 200 printers across campus}
    \resumeItemListEnd

    \resumeSubheading
      {Artificial Intelligence Research Assistant}{May 2019 -- July 2019}
      {Southwestern University}{Georgetown, TX}
      \resumeItemListStart
        \resumeItem{Explored methods to generate video game dungeons based off of \emph{The Legend of Zelda}}
        \resumeItem{Developed a game in Java to test the generated dungeons}
        \resumeItem{Contributed 50K+ lines of code to an established codebase via Git}
        \resumeItem{Conducted  a human subject study to determine which video game dungeon generation technique is enjoyable}
        \resumeItem{Wrote an 8-page paper and gave multiple presentations on-campus}
        \resumeItem{Presented virtually to the World Conference on Computational Intelligence}
      \resumeItemListEnd

  \resumeSubHeadingListEnd


%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
      \resumeProjectHeading
          {\textbf{Gitlytics} $|$ \emph{Python, Flask, React, PostgreSQL, Docker}}{June 2020 -- Present}
          \resumeItemListStart
            \resumeItem{Developed a full-stack web application using with Flask serving a REST API with React as the frontend}
            \resumeItem{Implemented GitHub OAuth to get data from user’s repositories}
            \resumeItem{Visualized GitHub data to show collaboration}
            \resumeItem{Used Celery and Redis for asynchronous tasks}
          \resumeItemListEnd
      \resumeProjectHeading
          {\textbf{Simple Paintball} $|$ \emph{Spigot API, Java, Maven, TravisCI, Git}}{May 2018 -- May 2020}
          \resumeItemListStart
            \resumeItem{Developed a Minecraft server plugin to entertain kids during free time for a previous job}
            \resumeItem{Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review}
            \resumeItem{Implemented continuous delivery using TravisCI to build the plugin upon new a release}
            \resumeItem{Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin}
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

      const resp = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],

        model: "gpt-3.5-turbo",
      });
      const chatGPTCoverLetterString = resp?.choices[0]?.message.content;

      const response = {
        projects: [
          {
            name: "Project 1 Name",
            technologies: "Project 1 tech",
            timeline: "Project 1 timeline",
            description: ["Project 1 description"],
          },
          {
            name: "Project 2 Name",
            technologies: "Project 2 tech",
            timeline: "Project 2 timeline",
            description: ["Project 2 description"],
          },
        ],
        experience: [
          {
            company: "Experience 1 Name",
            role: "Experience 1 Role",
            location: "Experience 1 Location",
            timeframe: "Experience 1 Timeframe",
            description: ["Experience 1 Description"],
          },
          {
            company: "Experience 2 Name",
            role: "Experience 2 Role",
            location: "Experience 2 Location",
            timeframe: "Experience 2 Timeframe",
            description: ["Experience 2 Description"],
          },
          {
            company: "Experience 3 Name",
            role: "Experience 3 Role",
            location: "Experience 3 Location",
            timeframe: "Experience 3 Timeframe",
            description: ["Experience 3 Description", "Exp 3 desc 2"],
          },
        ],
      };

      const resumeInput = {
        ...response,
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
    .input(z.object({ resume: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // u have input.resume now
      console.log(input.resume);
      return 2;
    }),
});
