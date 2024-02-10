import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const metadataRouter = createTRPCRouter({
  getUserMetadata: protectedProcedure.query(({ ctx }) => {
    return ctx.db.metadata.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  edit: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        location: z.string(),
        email: z.string(),
        phone: z.string(),
        linkedin: z.string(),
        github: z.string(),
        skills: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.metadata.upsert({
        where: {
          userId: ctx.session.user.id,
        },
        update: {
          name: input.name,
          location: input.location,
          email: input.email,
          phone: input.phone,
          linkedin: input.linkedin,
          github: input.github,
          skills: input.skills,
        },
        create: {
          name: input.name,
          location: input.location,
          email: input.email,
          phone: input.phone,
          linkedin: input.linkedin,
          github: input.github,
          skills: input.skills,
          userId: ctx.session.user.id,
        },
      });
    }),
});
