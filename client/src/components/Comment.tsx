import React, { useState } from "react";

interface CommentProps {
  username: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({ username, content }) => {
  return (
    <div className="border-b py-2">
      <p className="font-semibold">{username}</p>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
