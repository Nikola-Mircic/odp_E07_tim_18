import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getAllNews } from "../services/NewsService";
import type { News } from "../services/NewsService";
import useFetch from "../hooks/useFetch";



const NewsFeed = () => {
  const {data: news, loading, error} = useFetch<News[]>(getAllNews);


  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>
  if(!news) return <div>No news available.</div>

  console.log(news);

  return (
		<div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{news.map((n) => (
				<NewsCard key={n.id} id={n.id} title={n.naslov} views={n.br_pregleda} />
			))}
		</div>
	);
};

export default NewsFeed;
