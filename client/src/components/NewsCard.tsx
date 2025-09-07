import React from "react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  id: number;
  title: string;
  views: number;
  excerpt?: string;
  imageUrl?: string;
  author?: string;
  date?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  views,
  excerpt,
  imageUrl,
  author,
  date,
}) => {
  return (
    <article className="flex flex-col gap-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3">
      <Link to={`/news/${id}`} className="group block">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
        )}
        <h2 className="font-serif text-xl font-bold text-gray-900 group-hover:text-indigo-600">
          {title}
        </h2>
      </Link>

      {excerpt && (
        <p className="text-gray-700 text-sm line-clamp-3">{excerpt}</p>
      )}

      <div className="text-sm text-gray-500 flex gap-4 mt-auto">
        {author && <span>{author}</span>}
        {date && <span>{new Date(date).toLocaleDateString("sr-RS")}</span>}
        <span>{views} pregleda</span>
      </div>
    </article>
  );
};

export default NewsCard;
