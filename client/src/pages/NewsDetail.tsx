import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import Comment from "../components/Comment";
import AddComment from "../components/AddComment";
import { getAllNews } from "../services/NewsService";
import type { News } from "../services/NewsService";

interface CommentType {
  username: string;
  content: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [comments, setComments] = useState<CommentType[]>([
    { username: "Ana", content: "Odlična vest!" },
    { username: "Marko", content: "Hvala za info." },
  ]);

  useEffect(() => {
    if (id) {
      const allNews = getAllNews();
      const found = allNews.find((n) => n.id === Number(id)) || null;
      setNews(found);

      // Povezane vesti - jednostavno po prvih 3 koje nisu trenutna
      setRelatedNews(allNews.filter((n) => n.id !== Number(id)).slice(0, 3));
    }
  }, [id]);

  if (!news) return <p>Učitavanje vesti...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{news.title}</h1>
      <p className="text-gray-500 mb-4">Pregleda: {news.views}</p>
      <p className="mb-4">{news.content}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Povezane vesti</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedNews.map((n) => (
          <NewsCard key={n.id} id={n.id} title={n.title} views={n.views} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Komentari</h2>
      <div className="mb-4">
        {comments.map((c, index) => (
          <Comment key={index} username={c.username} content={c.content} />
        ))}
      </div>

      {/* Forma za dodavanje komentara */}
      <AddComment
        onAdd={(username, content) =>
          setComments([...comments, { username, content }])
        }
      />
    </div>
  );
};

export default NewsDetail;
