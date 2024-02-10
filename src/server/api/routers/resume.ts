import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const resumeRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        description: z.optional(z.string().min(1)),
        jobUrl: z.optional(z.string().min(1)),
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

      if (!input.jobUrl && !input.description) {
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
    }),
});
