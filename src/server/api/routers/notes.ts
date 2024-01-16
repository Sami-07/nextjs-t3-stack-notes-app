import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
    addNote: protectedProcedure
        .input(z.object({
            title: z.string(),
            content: z.string(),
            topicId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const note = await ctx.db.note.create({
                data: {
                    title: input.title,
                    content: input.content,
                    topicId: input.topicId,
                    userId: ctx.session.user.id
                }
            });

            const topicNotes = await ctx.db.topic.findUnique({
                where: {
                    id: input.topicId,
                    userId: ctx.session.user.id
                },

            });

            await ctx.db.topic.update({
                where: {
                  id: input.topicId,
                },
                data: {
                  notes: {
                    connect: {
                      id: note.id,
                    },
                  },
                },
              });
        }),
    getAll: protectedProcedure
        .input(z.object({ topicId: z.string() }))
        .query(async ({ ctx, input }) => {
            const notes = await ctx.db.note.findMany({
                where: {
                    userId: ctx.session.user.id,
                    topicId: input.topicId
                },
            })
         
            return notes;


        }),
    deleteNote: protectedProcedure
        .input(z.object({ noteId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.note.delete({
                where: {
                    id: input.noteId,
                },
            });
        }),
        getTopic: protectedProcedure
        .input(z.object({ topicId: z.string() }))
        .query(async ({ ctx, input }) => {
            const topic = await ctx.db.topic.findUnique({
                where: {
                    id: input.topicId,
                    userId: ctx.session.user.id
                },
              
                // include: {
                //     notes: true   //this lets you get the array of notes stored in  the topic
                // }
            })
           
            return topic?.title
        })
});
