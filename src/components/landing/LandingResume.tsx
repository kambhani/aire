import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type dummyLink = string;
type dummyEntry = {
  title: string;
  bulletPoints: string[];
  startDate: string;
  endDate: string;
};

type dummySkills = {
  title: string;
  entries: string;
};

type dummySection = {
  title: string;
  entries: dummyEntry[];
};

const containerVariant: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export default function LandingResume() {
  const links: dummyLink[] = ["LinkedIn", "GitHub", "Personal Website"];
  const sections: dummySection[] = [
    {
      title: "Education",
      entries: [
        {
          title: "Georgia Tech",
          bulletPoints: ["Bachelor of Science in Computer Science (4.00 GPA)"],
          startDate: "August 2022",
          endDate: "May 2026",
        },
      ],
    },
    {
      title: "Experience",
      entries: [
        {
          title: "Research Assistant",
          bulletPoints: [
            "Created numpy models",
            "Contributed to open-source software",
          ],
          startDate: "June 2023",
          endDate: "August 2023",
        },
        {
          title: "Tennis Coach",
          bulletPoints: [
            "Taught students the art of tennis",
            "Received high praise from clients for teaching ability",
          ],
          startDate: "June 2022",
          endDate: "August 2022",
        },
      ],
    },
    {
      title: "Projects",
      entries: [
        {
          title: "AI Resume Generator",
          bulletPoints: [
            "Used Chat-GPT to generate resumes",
            "Used Next.js to create the application",
            "Submitted to Hacklytics 2024",
          ],
          startDate: "February 2024",
          endDate: "February 2024",
        },
        {
          title: "Forex Trading Algorithm",
          bulletPoints: [
            "Used arbitrage algorithms to trade forex",
            "Made 1.4% profit over risk-free return",
            "Used MATLAB for model backtesting",
          ],
          startDate: "June 2023",
          endDate: "August 2023",
        },
      ],
    },
  ];
  const skillSection: dummySkills[] = [
    {
      title: "Languages",
      entries: "HTML, CSS, JavaScript, Python",
    },
    {
      title: "Frameworks",
      entries: "FastAPI, Next.js",
    },
    {
      title: "Developer Tools",
      entries: "Docker, GitHub, VS Code",
    },
    {
      title: "Libraries",
      entries: "numpy, pandas",
    },
  ];
  return (
    <motion.div
      variants={containerVariant}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      // whileHover={{
      //   x: -20,
      //   transition: {
      //     duration: 0.6,
      //     delay: 0,
      //   },
      // }}
      className="flex aspect-[2/3] w-full max-w-lg select-none flex-col gap-4 rounded-sm bg-white p-8 font-serif text-xs text-black drop-shadow-xl lg:p-10 lg:text-base"
    >
      <p className="text-center text-base font-bold lg:text-xl">
        George P. Burdell
      </p>
      <div className="mx-auto flex items-center gap-4 text-center">
        {links.map((link, id) => (
          <motion.div
            key={link}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.6 + 0.2 * id }}
          >
            <p className="underline">{link}</p>
          </motion.div>
        ))}
      </div>
      {sections.map((section, id) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1 + 0.2 * id }}
        >
          <p className="font-bold uppercase underline">{section.title}</p>
          {section.entries.map((entry) => (
            <div key={entry.title}>
              <div className="flex items-center justify-between">
                <p className="font-bold">{entry.title}</p>
                <div>
                  <p>
                    {entry.startDate} - {entry.endDate}
                  </p>
                </div>
              </div>
              <ul className="ml-4 list-disc">
                {entry.bulletPoints.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 + 0.2 * sections.length }}
      >
        <p className="font-bold uppercase underline">Skills</p>
        {skillSection.map((skills) => (
          <div key={skills.title}>
            <p className="font-bold">
              {skills.title}{" "}
              <span className="font-normal">: {skills.entries}</span>
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
