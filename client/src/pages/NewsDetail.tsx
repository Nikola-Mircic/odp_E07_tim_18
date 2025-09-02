import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import Comment from "../components/Comment";
import AddComment from "../components/AddComment";
import type { VestDto } from "../models/vesti/VestDto";
import { vestiApi } from "../api_services/vesti/VestAPIService";

interface CommentType {
  username: string;
  content: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<VestDto | null>(null);
  const [relatedNews, setRelatedNews] = useState<VestDto[]>([]);
  const [comments, setComments] = useState<CommentType[]>([
    { username: "Ana", content: "Odlična vest!" },
    { username: "Marko", content: "Hvala za info." },
  ]);

  useEffect(() => {
    (async () => {
			if (id) {
				// OVO JE SAMO PRIMER!
				var found = await vestiApi
					.getById(parseInt(id))
					.then((res) => res.data);

				if (!found) setNews(null);
				else setNews(found);

				// Povezane vesti - jednostavno po prvih 3 koje nisu trenutna
				var slicne = await vestiApi
					.getSlicneVesti(Number(id))
					.then((res) => res.data);
				if (!slicne) setRelatedNews([]);
				else setRelatedNews(slicne);
			}
		})();
  }, [id]);

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
