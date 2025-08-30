import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getAllNews } from "../services/NewsService";
import type { News } from "../services/NewsService";



const NewsFeed = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    // povuci vesti iz servisa
    const fetchedNews = getAllNews();
    setNews(fetchedNews);
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {news.map((n) => (
        <NewsCard key={n.id} id={n.id} title={n.title} views={n.views} />
      ))}
    </div>
  );
};

export default NewsFeed;
