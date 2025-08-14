import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { users } from './user';
import { books } from './book';

export const usersToBooksRead = pgTable('user_to_book_read', (d) => ({
  userId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => users.id),
  bookId: d
    .integer()
    .notNull()
    .references(() => books.id),
}));

export const usersToBooksRelations = relations(usersToBooksRead, ({ one }) => ({
  user: one(users, {
    fields: [usersToBooksRead.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [usersToBooksRead.bookId],
    references: [books.id],
  }),
}));
