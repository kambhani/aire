import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const resumeRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        description: z.optional(z.string()),
        jobUrl: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.db.user.findFirstOrThrow({
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

      if (
        (!input.jobUrl || input.jobUrl.length == 0) &&
        (!input.description || input.description.length == 0)
      ) {
        throw new TRPCError({
          message: "You must enter either a job url or job description",
          code: "BAD_REQUEST",
        });
      }

      let description = "";
      if (input.jobUrl) {
        // Do some processing to this to get the job description
        // Prob just a call to some llm with the url html as input
        description = "We want SQL experience and Typescript experience.";
      }
      if (input.description) {
        description = input.description; // Actual job description will overwrite URL
      }

      // Perform the LLM stuff here, and get the response URLs

      const ret = {
        match: 18,
        suggestions: [
          "Expand on your projects section to showcase your skills to employers",
          "You do not need so many things in the awards section because it distracts from the overall point in your resume",
          "High school experiences are not always needed on a resume once you are in college, consider removing them",
        ],
        urls: [
          "https://www.overleaf.com/latex/templates/swe-resume-template/bznbzdprjfyy",
          "https://www.overleaf.com/latex/templates/swe-resume-template/bznbzdprjfyy",
        ],
      };

      return ret;
    }),
});
