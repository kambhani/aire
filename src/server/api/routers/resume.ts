import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const resumeRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        description: z.string().min(1),
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

      // make llm call with input.description and user

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
