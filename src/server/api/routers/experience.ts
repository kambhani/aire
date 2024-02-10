import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        company: z.string().min(1),
        role: z.string().min(1),
        timeframe: z.string().min(1),
        location: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.create({
        data: {
          company: input.company,
          role: input.role,
          timeframe: input.timeframe,
          location: input.location,
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
    }),

  getUserExperience: protectedProcedure.query(({ ctx }) => {
    return ctx.db.experience.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const experience = await ctx.db.experience.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });

      if (experience.userId != ctx.session.user.id) {
        throw new TRPCError({
          message: "Cannot delete another user's experience!",
          code: "FORBIDDEN",
        });
      }

      return ctx.db.experience.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
