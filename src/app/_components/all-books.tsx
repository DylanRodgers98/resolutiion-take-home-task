"use client";

import { api } from "~/trpc/react";
import { Book } from "./book";

export function AllBooks() {
  const [books] = api.book.getAll.useSuspenseQuery();

  return (
    <div className="w-full max-w-xs">
      {books.length ? (
        books.map((book, i) => (
          <Book key={i} title={book.title} author={book.author} />
        ))
      ) : (
        <p>You have no books yet.</p>
      )}
    </div>
  );
}
