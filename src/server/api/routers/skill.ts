import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const skillRouter = createTRPCRouter({
  getUserSkills: protectedProcedure.query(({ ctx }) => {
    return ctx.db.skill.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  edit: protectedProcedure
    .input(
      z.object({
        languages: z.string().min(1),
        frameworks: z.string().min(1),
        developerTools: z.string().min(1),
        libraries: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.skill.upsert({
        where: {
          userId: ctx.session.user.id,
        },
        update: {
          languages: input.languages,
          frameworks: input.frameworks,
          developerTools: input.developerTools,
          libraries: input.libraries,
        },
        create: {
          languages: input.languages,
          frameworks: input.frameworks,
          developerTools: input.developerTools,
          libraries: input.libraries,
          userId: ctx.session.user.id,
        },
      });
    }),
});
