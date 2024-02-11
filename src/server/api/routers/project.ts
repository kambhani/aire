import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        technologies: z.string().min(1),
        timeframe: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.name,
          technologies: input.technologies,
          timeframe: input.timeframe,
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
    }),

  getUserProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        technologies: z.string().min(1),
        timeframe: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });

      if (project.userId != ctx.session.user.id) {
        throw new TRPCError({
          message: "Cannot update another user's project!",
          code: "FORBIDDEN",
        });
      }

      return ctx.db.project.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          technologies: input.technologies,
          timeframe: input.timeframe,
          description: input.description,
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
      const project = await ctx.db.project.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });

      if (project.userId != ctx.session.user.id) {
        throw new TRPCError({
          message: "Cannot delete another user's project!",
          code: "FORBIDDEN",
        });
      }

      return ctx.db.project.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
