import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { publisher } from "./publisher";

export const book = sqliteTable("book", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  publisherId: integer().notNull().references(() => publisher.id),
  printingYear: integer().notNull(),
  size: text().notNull(),
  pageCount: integer().notNull(),
  bindingForm: text().notNull(),
  url: text().notNull()
});
