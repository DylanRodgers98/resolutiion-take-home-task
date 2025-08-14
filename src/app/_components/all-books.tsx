"use client";

import { api } from "~/trpc/react";
import { Book } from "./book";

interface Props {
  isLoggedIn: boolean;
}

export function AllBooks(props: Props) {
  const [books] = api.book.getAll.useSuspenseQuery();
  console.log(books);

  return (
    <div className="w-full max-w-xs">
      {books.length ? (
        books.map((book) => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            isRead={book.isRead}
            isLoggedIn={props.isLoggedIn}
          />
        ))
      ) : (
        <p>You have no books yet.</p>
      )}
    </div>
  );
}
