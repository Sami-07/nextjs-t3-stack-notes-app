import { createTRPCRouter } from "~/server/api/trpc";
import { topicRouter } from "./routers/topic";
import { notesRouter } from "./routers/notes";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  
  topic: topicRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
