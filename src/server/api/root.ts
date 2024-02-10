import { postRouter } from "~/server/api/routers/post";
import { experienceRouter } from "./routers/experience";
import { createTRPCRouter } from "~/server/api/trpc";
import { educationRouter } from "./routers/education";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  experience: experienceRouter,
  education: educationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
