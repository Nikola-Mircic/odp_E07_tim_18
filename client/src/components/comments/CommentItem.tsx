import React, { useState } from "react";
import type { CommentDto } from "../../api_services/comments/CommentApiService";
import { commentsApi } from "../../api_services/comments/CommentApiService";
import { useAuth } from "../../providers/AuthProvider";

type Props = {
  data: CommentDto;
  onUpdated: (c: CommentDto) => void;
  onDeleted: (id: number) => void;
};

export default function CommentItem({ data, onUpdated, onDeleted }: Props) {
  const { user, token } = useAuth();

  const autor =
    (data as any).autor ??
    (data as any).username ??
    "Anon";
  const autorId = Number(
    (data as any).autor_id ??
      (data as any).authorId ??
      (data as any).user_id ??
      NaN
  );
  const initialText = String(
    (data as any).tekst ?? (data as any).content ?? ""
  );

  const roleLower = (user?.uloga ?? "").toLowerCase().trim();
  const isOwner = !!user && !Number.isNaN(autorId) && user.id === autorId;
  const isStaff = roleLower === "admin" || roleLower === "editor";
  const canModify = !!token && (isOwner || isStaff);

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!token) return;
    const trimmed = text.trim();
    if (!trimmed || trimmed === initialText) {
      setEditing(false);
      setText(initialText);
      return;
    }
    setLoading(true);
    try {
      await commentsApi.update(Number((data as any).id), { content: trimmed });
      onUpdated({ ...(data as any), tekst: trimmed, content: trimmed } as CommentDto);
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
      await commentsApi.remove(Number((data as any).id));
      onDeleted(Number((data as any).id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-3 border-b">
      <div className="text-sm text-gray-600">{autor}</div>

      {!editing ? (
        <p className="whitespace-pre-wrap mt-1">{text}</p>
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
              <button
                className="px-3 py-1"
                onClick={() => {
                  setEditing(false);
                  setText(initialText);
                }}
              >
                Otkaži
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
