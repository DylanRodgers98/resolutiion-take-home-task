import { IsBookReadCheckbox } from "./is-book-read-checkbox";

interface BookProps {
  id: number;
  title: string;
  author: string;
  isRead: boolean;
  isLoggedIn: boolean;
}

export function Book({ id, title, author, isRead, isLoggedIn }: BookProps) {
  return (
    <div className="py-2">
      <p className="truncate">
        {id}: {title} by {author}
      </p>
      Read?{" "}
      <IsBookReadCheckbox bookId={id} isRead={isRead} isLoggedIn={isLoggedIn} />
    </div>
  );
}
