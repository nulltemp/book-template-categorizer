"use server";

import { db } from "@/db/index";
import { bookTemplateTable } from "@/db/schema/bookTemplate";
import { eq, and } from "drizzle-orm";

/**
 * 新しい書籍テンプレートを作成する
 */
export async function createBookTemplate(
  userId: string,
  name: string,
  width: number,
  height: number
) {
  return await db
    .insert(bookTemplateTable)
    .values({
      userId,
      name,
      width,
      height,
    })
    .returning();
}

/**
 * ユーザーのすべての書籍テンプレートを取得する
 */
export async function getBookTemplatesByUserId(userId: string) {
  return await db
    .select()
    .from(bookTemplateTable)
    .where(eq(bookTemplateTable.userId, userId));
}

/**
 * 書籍テンプレートを更新する
 */
export async function updateBookTemplate(
  id: number,
  userId: string,
  data: {
    name?: string;
    width?: number;
    height?: number;
  }
) {
  return await db
    .update(bookTemplateTable)
    .set(data)
    .where(and(eq(bookTemplateTable.id, id), eq(bookTemplateTable.userId, userId)))
    .returning();
}

/**
 * 書籍テンプレートを削除する
 */
export async function deleteBookTemplate(id: number, userId: string) {
  return await db
    .delete(bookTemplateTable)
    .where(and(eq(bookTemplateTable.id, id), eq(bookTemplateTable.userId, userId)))
    .returning();
}
