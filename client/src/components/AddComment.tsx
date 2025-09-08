import React, { useState } from "react";

interface AddCommentProps {
  onAdd: (username: string, content: string) => void | Promise<void>;
}

const AddComment: React.FC<AddCommentProps> = ({ onAdd }) => {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim();
    const c = content.trim();
    if (!u || !c) return;

    try {
      setLoading(true);
      await onAdd(u, c);
      setUsername("");
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Dodaj komentar</h3>
      <input
        type="text"
        placeholder="Vaše ime"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <textarea
        placeholder="Komentar"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
        rows={3}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        disabled={loading || !username.trim() || !content.trim()}
      >
        {loading ? "Slanje…" : "Dodaj komentar"}
      </button>
    </form>
  );
};

export default AddComment;
