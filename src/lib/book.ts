"use server";

import { db } from "@/db/index";
import { book } from "@/db/schema/book";
import { author } from "@/db/schema/author";
import { publisher } from "@/db/schema/publisher";
import { bookAuthor } from "@/db/schema/bookAuthor";
import { eq } from "drizzle-orm";

/**
 * 書籍の一覧を取得する
 * 
 * @param offset 
 * @param limit 
 * @returns 
 */
export async function getBooks(offset = 0, limit = 10) {
  return await db.select().from(book).orderBy(book.id).limit(limit).offset(offset);
}

/**
 * IDを指定して特定の書籍を取得する
 * 
 * @param id 
 * @returns 
 */
export async function getBookById(id: number) {
  const [bookData] = await db
    .select()
    .from(book)
    .where(eq(book.id, id))
    .innerJoin(publisher, eq(book.publisherId, publisher.id));

  if (!bookData) {
    return null;
  }

  const authorsData = await db
    .select()
    .from(bookAuthor)
    .where(eq(bookAuthor.bookId, id))
    .innerJoin(author, eq(bookAuthor.authorId, author.id));

  return {
    book: bookData.book,
    publisher: bookData.publisher,
    authors: authorsData
  };
}
