export type AuthorData = {
  book_author: {
    id: number;
    bookId: number;
    authorId: number;
    type: string;
  };
  author: {
    id: number;
    name: string;
    country: string;
  };
}