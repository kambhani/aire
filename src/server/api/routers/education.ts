import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const educationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        school: z.string().min(1),
        degree: z.string().min(1),
        timeframe: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.education.create({
        data: {
          school: input.school,
          degree: input.degree,
          timeframe: input.timeframe,
          userId: ctx.session.user.id,
        },
      });
    }),

  getUserEducation: protectedProcedure.query(({ ctx }) => {
    return ctx.db.education.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        school: z.string().min(1),
        degree: z.string().min(1),
        timeframe: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const education = await ctx.db.education.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });

      if (education.userId != ctx.session.user.id) {
        throw new TRPCError({
          message: "Cannot delete another user's education!",
          code: "FORBIDDEN",
        });
      }

      return ctx.db.education.update({
        where: {
          id: input.id,
        },
        data: {
          school: input.school,
          degree: input.degree,
          timeframe: input.timeframe,
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
      const education = await ctx.db.education.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });

      if (education.userId != ctx.session.user.id) {
        throw new TRPCError({
          message: "Cannot delete another user's education!",
          code: "FORBIDDEN",
        });
      }

      return ctx.db.education.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
