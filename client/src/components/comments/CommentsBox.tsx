// client/src/components/comments/CommentsBox.tsx
import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { useAuth } from "../../hooks/useAuthHook";
import type { CommentDto } from "../../models/comments/CommentDto";
import type { ICommentApIService } from "../../api_services/comments/ICommentsApiService";

type Props = { 
  vestId: number,
  commentsApi: ICommentApIService
};

export default function CommentsBox({ vestId, commentsApi }: Props) {
  const { user, token } = useAuth();
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const list = await commentsApi.getCommentsForVest(vestId);
    setComments(list.data || []);
  };

  useEffect(() => {
    load().catch(console.error);
  }, [vestId]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newText.trim()) return;
    setLoading(true);
    try {
      await commentsApi.createComment(token, {
        vestId,
        autorId: user?.id || 0,
        tekst: newText.trim(),
        vreme: new Date(),
      });
      setNewText("");
      await load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Komentari</h2>

      <div className="space-y-3">
        {comments.map((c) => (
          <CommentItem
            commentsApi={commentsApi}
            key={c.id}
            data={c}
            onUpdated={(nc) =>
              setComments((prev) => prev.map((x) => (x.id === nc.id ? nc : x)))
            }
            onDeleted={(cid) => setComments((prev) => prev.filter((x) => x.id !== cid))}
          />
        ))}
        {comments.length === 0 && <div className="text-sm text-gray-500">Još nema komentara.</div>}
      </div>

      <form onSubmit={add} className="mt-5 grid gap-2">
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          placeholder={token ? "Dodaj komentar…" : "Prijavi se da bi dodao komentar."}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          disabled={!token}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded w-fit disabled:opacity-60"
          disabled={!token || !newText.trim() || loading}
        >
          Objavi
        </button>
      </form>
    </section>
  );
}
