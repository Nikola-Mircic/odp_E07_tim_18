import React, { useState } from "react";

interface AddCommentProps {
  onAdd: (username: string, content: string) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ onAdd }) => {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && content) {
      onAdd(username, content);
      setUsername("");
      setContent("");
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
        className="w-full border p-1 mb-2"
      />
      <textarea
        placeholder="Komentar"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-1 mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Dodaj komentar
      </button>
    </form>
  );
};

export default AddComment;
