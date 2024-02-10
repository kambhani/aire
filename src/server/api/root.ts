import { postRouter } from "~/server/api/routers/post";
import { experienceRouter } from "./routers/experience";
import { createTRPCRouter } from "~/server/api/trpc";
import { educationRouter } from "./routers/education";
import { projectRouter } from "./routers/project";
import { metadataRouter } from "./routers/metadata";
import { resumeRouter } from "./routers/resume";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  metadata: metadataRouter,
  experience: experienceRouter,
  education: educationRouter,
  project: projectRouter,
  resume: resumeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
