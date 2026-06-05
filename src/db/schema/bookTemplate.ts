import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const bookTemplateTable = sqliteTable("book_template", {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: text().notNull(),
  name: text().notNull().unique(),
  width: integer().notNull(),
  height: integer().notNull(),
}, (t) => [
  unique().on(t.userId, t.name),
  unique().on(t.userId, t.width, t.height),
]);
