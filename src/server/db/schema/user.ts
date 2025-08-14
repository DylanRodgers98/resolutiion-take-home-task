import { sql, relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { accounts } from './auth';
import { usersToBooksRead } from './user-to-book-read';

export const users = pgTable('user', (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  emailVerified: d
    .timestamp({
      mode: 'date',
      withTimezone: true,
    })
    .default(sql`CURRENT_TIMESTAMP`),
  image: d.varchar({ length: 255 }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  usersToBooks: many(usersToBooksRead),
}));
