import { useEffect, useState } from "react";
import { commentsApi, type CommentDto } from "../../api_services/comments/CommentApiService";

type Props = {
  vestId: number;
  refreshKey?: number; // promeni se nakon uspešnog unosa, pa refetch
};

export default function CommentsBox({ vestId, refreshKey = 0 }: Props) {
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function fetchComments() {
    setLoading(true);
    setErr(null);
    try {
      const data = await commentsApi.getByVestId(vestId);
      setComments(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErr(e?.message ?? "Greška pri učitavanju komentara");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!vestId) return;
    fetchComments().catch(console.error);
  }, [vestId, refreshKey]);

  if (loading && comments.length === 0) {
    return <p className="text-gray-500 mb-3">Učitavanje komentara…</p>;
  }
  if (err && comments.length === 0) {
    return <p className="text-red-600 mb-3">{err}</p>;
  }
  if (comments.length === 0) {
    return <p className="text-gray-500 mb-3">Još nema komentara.</p>;
  }

  return (
    <ul className="space-y-3 mb-4">
      {comments.map((c) => (
        <li key={c.id} className="border rounded p-3">
          <div className="text-sm text-gray-600 mb-1">@{c.username}</div>
          <div>{c.content}</div>
        </li>
      ))}
    </ul>
  );
}
