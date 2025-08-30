import React from "react";

interface NewsCardProps{
    title: string;
    views: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, views }) => {
    return (
        <div className="border p-2 mb-2">
            <h2>{title}</h2>
            <p>Pregleda: {views}</p>
        </div>
    );
};

export default NewsCard;