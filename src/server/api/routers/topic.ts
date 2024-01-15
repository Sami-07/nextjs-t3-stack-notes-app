import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

//add this topic router to the "root" router
export const topicRouter = createTRPCRouter({


    sayHello: publicProcedure
        .query(() => {
            return "Hello, World!";
        }),

    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            return ctx.db.topic.findMany({
                where: {
                    userId: ctx.session.user.id
                }
            })
        }
        ),
    create: protectedProcedure
        .input(z.object({
            title: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.topic.create({
                data: {
                    title: input.title,
                    userId: ctx.session.user.id
                }
            });
        })
});
