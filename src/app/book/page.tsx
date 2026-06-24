"use client";

import { useState, useEffect } from "react";
import { getBooks, getBookById } from "@/lib/book";
import { Book } from "@/types/book";
import { BookDetail } from "@/types/bookDetail";

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const allBooks = await getBooks();
        setBooks(allBooks);
      } catch (e) {
        console.error("Error fetching books:", e);
        setError("書籍の取得中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const handleBookClick = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const bookDetail = await getBookById(id);
      setSelectedBook(bookDetail);
      setIsModalOpen(true);
    } catch (e) {
      console.error("Error fetching book detail:", e);
      setError("書籍詳細の取得中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">書籍一覧</h1>

      <div className="mt-8 w-1/2">
        {loading && <p>読み込み中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && books.length === 0 && !error && (
          <p>書籍が見つかりませんでした。</p>
        )}
        <ul>
          {books.map((bookItem) => (
            <li
              key={bookItem.id}
              className="border-b border-gray-200 py-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleBookClick(bookItem.id)}
            >
              <h2 className="text-xl font-semibold">{bookItem.title}</h2>
              <p className="text-gray-700">刷年数: {bookItem.printingYear}</p>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && selectedBook && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={closeModal}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">
              {selectedBook.book.title}
            </h3>
            <p className="text-gray-700">
              <a
                href={selectedBook.book.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {selectedBook.book.url}
              </a>
            </p>
            <p className="text-gray-700">書名: {selectedBook.book.title}</p>
            {selectedBook.authors.map((authorData, index) => (
              <p key={index} className="text-gray-700">
                作: 【{authorData.book_author.type}】
                {authorData.author?.name || "不明"}｜
                {authorData.author?.country || "不明"}
              </p>
            ))}
            {selectedBook.publisher && (
              <p className="text-gray-700">
                出版社: {selectedBook.publisher.name}｜
                {selectedBook.publisher.country}
              </p>
            )}
            <p className="text-gray-700">
              刷年数: {selectedBook.book.printingYear}
            </p>
            <p className="text-gray-700">
              サイズ: {selectedBook.book.size}／{selectedBook.book.pageCount}／
              {selectedBook.book.bindingForm}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
