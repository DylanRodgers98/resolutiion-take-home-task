interface BookProps {
  title: string;
  author: string;
}

export function Book({ title, author }: BookProps) {
  return (
    <p className="truncate">
      {title} by {author}
    </p>
  );
}
