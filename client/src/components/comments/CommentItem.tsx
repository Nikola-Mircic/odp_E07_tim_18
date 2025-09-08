// client/src/components/comments/CommentItem.tsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuthHook";
import type { CommentDto } from "../../models/comments/CommentDto";
import type { ICommentApIService } from "../../api_services/comments/ICommentsApiService";

type Props = {
  data: CommentDto;
  commentsApi: ICommentApIService;
  onUpdated: (c: CommentDto) => void;
  onDeleted: (id: number) => void;
};

export default function CommentItem({ data, commentsApi, onUpdated, onDeleted }: Props) {
  const { user, token } = useAuth();
  const canModify =
    user &&
    token &&
    (user.id === data.autor.id || user.uloga === "editor");

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(data.tekst);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await commentsApi.updateComment(token, { ...data, tekst: text.trim() });
      onUpdated({ ...data, tekst: text.trim() });
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const del = async () => {
    if (!token) return;
    if (!window.confirm("Obrisati komentar?")) return;
    setLoading(true);
    try {
      await commentsApi.removeComment(token, data.id);
      onDeleted(data.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-3 border-b">
      <div className="text-sm text-gray-600">{data.autor.ime} {data.autor.prezime}</div>

      {!editing ? (
        <p className="whitespace-pre-wrap mt-1">{data.tekst}</p>
      ) : (
        <textarea
          className="w-full border rounded p-2 mt-1"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {canModify && (
        <div className="mt-2 flex gap-2">
          {!editing ? (
            <>
              <button className="text-blue-600" onClick={() => setEditing(true)}>
                Izmeni
              </button>
              <button className="text-red-600" onClick={del} disabled={loading}>
                Obriši
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-black text-white px-3 py-1 rounded"
                onClick={save}
                disabled={loading || !text.trim()}
              >
                Sačuvaj
              </button>
              <button className="px-3 py-1" onClick={() => { setEditing(false); setText(data.tekst); }}>
                Otkaži
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
