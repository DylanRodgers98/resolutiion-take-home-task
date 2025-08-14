import { useState } from "react";
import { api } from "~/trpc/react";

interface Props {
  bookId: number;
  isRead: boolean;
}

export function IsBookReadCheckbox(props: Props) {
  const [isRead, setIsRead] = useState(props.isRead);

  const utils = api.useUtils();
  const toggleBookReadByUser = api.book.toggleBookReadByUser.useMutation({
    onSuccess: async () => {
      await utils.book.invalidate();
    },
  });

  return (
    <input
      type="checkbox"
      checked={isRead}
      onChange={async (e) => {
        e.preventDefault();
        setIsRead(!isRead);
        toggleBookReadByUser.mutate({ bookId: props.bookId });
      }}
    />
  );
}
