import { Book } from "@/types/book";
import { AuthorData } from "@/types/authorData";
import { Publisher } from "@/types/publisher";

export type BookDetail = {
  book: Book;
  publisher: Publisher;
  authors: AuthorData[];
}