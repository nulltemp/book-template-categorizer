import { integer, sqliteTable, unique, text } from "drizzle-orm/sqlite-core";
import { book } from "./book";
import { author } from "./author";

export const bookAuthor = sqliteTable("book_author", {
  id: integer().primaryKey({ autoIncrement: true }),
  bookId: integer().notNull().references(() => book.id),
  authorId: integer().notNull().references(() => author.id),
  type: text().notNull()
}, (t) => [
  unique().on(t.bookId, t.authorId)
]);
