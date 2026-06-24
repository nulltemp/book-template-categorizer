import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const publisher = sqliteTable("publisher", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  country: text().notNull()
});
