import { Variants, motion } from "framer-motion";

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

const childVariant: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
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
          title: "Monster's University",
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
          title: "Test Experience 1",
          bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
          startDate: "June 2023",
          endDate: "August 2023",
        },
        {
          title: "Test Experience 2",
          bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
          startDate: "June 2022",
          endDate: "August 2022",
        },
      ],
    },
    {
      title: "Projects",
      entries: [
        {
          title: "Test Project 1",
          bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
          startDate: "June 2023",
          endDate: "August 2023",
        },
        {
          title: "Test Project 2",
          bulletPoints: ["Bullet 1", "Bullet 2", "Bullet 3"],
          startDate: "June 2022",
          endDate: "August 2022",
        },
      ],
    },
  ];
  const skillSection: dummySkills[] = [
    {
      title: "Languages",
      entries: "Language 1, Language 2, Language 3",
    },
    {
      title: "Frameworks",
      entries: "Framework 1, Framework 2, Framework 3",
    },
    {
      title: "Developer Tools",
      entries: "Tool 1, Tool 2, Tool 3",
    },
    {
      title: "Libraries",
      entries: "Library 1, Library 2, Library 3",
    },
  ];
  return (
    <motion.div
      variants={containerVariant}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex aspect-[2/3] w-full max-w-md select-none flex-col justify-between rounded-sm bg-white p-4 font-serif text-sm drop-shadow-xl"
    >
      <p className="text-center text-xl font-bold">John Doe</p>
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
          {section.entries.map((entry, id) => (
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
                {entry.bulletPoints.map((bullet, id) => (
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
        {skillSection.map((skills, id) => (
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
