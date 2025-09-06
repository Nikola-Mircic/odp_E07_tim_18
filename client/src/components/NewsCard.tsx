import React from "react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  id: number;
  title: string;
  views: number;
  excerpt?: string; // kratak opis ako postoji
  imageUrl?: string; // slika ako postoji
  author?: string; // autor ako postoji
  date?: string; // datum objave
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
    <Link to={`/news/${id}`} className="block group">
      <div className="flex flex-col gap-3">
        {/* Slika */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-md"
          />
        )}

        {/* Naslov i opis */}
        <div>
          <h2 className="font-serif text-xl font-bold text-gray-900 group-hover:text-black">
            {title}
          </h2>
          {excerpt && (
            <p className="text-gray-700 text-sm mt-2 line-clamp-3">{excerpt}</p>
          )}
        </div>

        {/* Meta info */}
        <div className="text-sm text-gray-500 flex gap-4">
          {author && <span>{author}</span>}
          {date && <span>{new Date(date).toLocaleDateString("sr-RS")}</span>}
          <span>{views} pregleda</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
