import { vestiApi } from "../api_services/vesti/VestAPIService";
import NewsCard from "../components/NewsCard";
import useFetch from "../hooks/useFetch";
import type { VestDto } from "../models/vesti/VestDto";
import type { ApiResponse } from "../types/common/ApiResponse";

const NewsFeed = () => {
  const { data, loading, error } = useFetch<ApiResponse<VestDto[]>>(
    vestiApi.getNajpopularnije,
    0,
    6 
  );

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 font-medium py-10">
        Greška prilikom učitavanja vesti: {error.message}
      </div>
    );

  if (!data || !data.data || data.data.length === 0)
    return (
      <div className="text-center text-gray-500 py-10">
        Trenutno nema dostupnih vesti.
      </div>
    );

  const news = data.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Najpopularnije vesti
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <NewsCard
            key={n.id}
            id={n.id}
            title={n.naslov}
            views={n.brPregleda}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
