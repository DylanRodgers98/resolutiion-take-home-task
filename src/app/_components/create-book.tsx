"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const utils = api.useUtils();
  const createBook = api.book.create.useMutation({
    onSuccess: async () => {
      await utils.book.invalidate();
      setTitle("");
      setAuthor("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createBook.mutate({ title, author });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createBook.isPending}
        >
          {createBook.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
