import React from "react";

interface NewsCardProps{
    id: number;
    title: string;
    views: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, views }) => {
    return (
        <div className="border p-2 mb-2">
            <h2>{title}</h2>
            <p>Pregleda: {views}</p>
        </div>
    );
};

export default NewsCard;