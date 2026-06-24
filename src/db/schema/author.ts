import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const author = sqliteTable("author", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  country: text().notNull()
});
