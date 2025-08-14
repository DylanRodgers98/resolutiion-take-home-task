import { sql, relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { usersToBooksRead } from './user-to-book-read';

export const books = pgTable('book', (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  title: d.varchar({ length: 255 }).notNull(),
  author: d.varchar({ length: 255 }).notNull(),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
}));

export const booksRelations = relations(books, ({ many }) => ({
  usersToBooks: many(usersToBooksRead),
}));
