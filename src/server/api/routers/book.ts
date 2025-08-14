/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { eq, and, count, desc } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { usersToBooksRead } from "~/server/db/schema";
import { books } from "~/server/db/schema/book";

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure
    .output(
      z.array(
        z.object({
          id: z.number().int(),
          title: z.string().min(1).trim(),
          author: z.string().min(1).trim(),
          isRead: z
            .boolean()
            .optional()
            .transform((val) => val ?? false),
        }),
      ),
    )
    .query(async ({ ctx }) => {
      if (ctx.session) {
        const result = await ctx.db
          .select()
          .from(books)
          .leftJoin(usersToBooksRead, eq(usersToBooksRead.bookId, books.id))
          .orderBy(desc(books.updatedAt));

        return result.map(({ book, user_to_book_read }) => {
          console.log(user_to_book_read);
          return {
            id: book.id as number,
            title: `${book.title}`,
            author: `${book.author}`,
            isRead: !!user_to_book_read,
          };
        });
      }
      return ctx.db
        .select({
          id: books.id,
          title: books.title,
          author: books.author,
        })
        .from(books)
        .orderBy(desc(books.updatedAt));
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).trim(),
        author: z.string().min(1).trim(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(books).values({
        title: input.title,
        author: input.author,
      });
    }),

  toggleBookReadByUser: protectedProcedure
    .input(z.object({ bookId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const bookId = input.bookId;

      const where = and(
        eq(usersToBooksRead.userId, userId),
        eq(usersToBooksRead.bookId, bookId),
      );

      await ctx.db.transaction(async (tx) => {
        const result = await tx
          .select({ count: count() })
          .from(usersToBooksRead)
          .where(where);

        const isBookRead = (result?.[0]?.count ?? 0) > 0;

        if (isBookRead) {
          await tx.delete(usersToBooksRead).where(where);
        } else {
          await tx.insert(usersToBooksRead).values({ userId, bookId });
        }
      });
    }),
});
