import { vestiApi } from "../api_services/vesti/VestAPIService";
import NewsCard from "../components/NewsCard";
import useFetch from "../hooks/useFetch";
import type { VestDto } from "../models/vesti/VestDto";
import type { ApiResponse } from "../types/common/ApiResponse";

const NewsFeed = () => {
  const {data, loading, error} = useFetch<ApiResponse<VestDto[]> | undefined>(() => vestiApi.getNajpopularnije(0, 4));


  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>
  if(!data) return <div>No news available.</div>

  var news = data.data;
  if(!news)
    return <div>No data returned!</div>

  console.log(news);

  return (
		<div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{news.map((n) => (
				<NewsCard key={n.id} id={n.id} title={n.naslov} views={n.brPregleda} />
			))}
		</div>
	);
};

export default NewsFeed;
