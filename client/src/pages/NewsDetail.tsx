import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import AddComment from "../components/AddComment";
import CommentsBox from "../components/comments/CommentsBox";
import type { VestDto } from "../models/vesti/VestDto";
import { vestiApi } from "../api_services/vesti/VestAPIService";
import { commentsApi } from "../api_services/comments/CommentApiService";

interface CommentType {
  username: string;
  content: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<VestDto | null>(null);
  const [relatedNews, setRelatedNews] = useState<VestDto[]>([]);
  const [reloadComments, setReloadComments] = useState(0);

  useEffect(() => {
    if (!id) return;
    (async () => {
      // (opciono) ako imaš endpoint za preglede, pozovi ga ovde:
      // try { await vestiApi.incrementPregled(Number(id)); } catch {}

      const found = await vestiApi.getById(Number(id)).then((res) => res.data);
      setNews(found ?? null);

      const slicne = await vestiApi.getSlicneVesti(Number(id)).then((res) => res.data);
      setRelatedNews(slicne ?? []);
    })();
  }, [id]);

  const handleAddComment = async (username: string, content: string) => {
    if (!id) return;
    await commentsApi.create({
      vestId: Number(id),
      username,
      content,
    });
    setReloadComments((x) => x + 1); // okini refetch u CommentsBox
  };

  if (!news) return <p>Učitavanje vesti...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold mb-2">{news.naslov}</h1>
      <p className="text-gray-500 mb-4">Pregleda: {news.brPregleda}</p>
      <p className="mb-4">{news.tekst}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Povezane vesti</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedNews.map((n) => (
          <NewsCard key={n.id} id={n.id} title={n.naslov} views={n.brPregleda} />
        ))}
      </div>

      {/* Lista komentara (bez naslova i bez forme u CommentsBox) */}
      {id ? <CommentsBox vestId={Number(id)} refreshKey={reloadComments} /> : null}

      {/* Jedina forma za unos i submit */}
      <AddComment onAdd={handleAddComment} />
    </div>
  );
};

export default NewsDetail;
