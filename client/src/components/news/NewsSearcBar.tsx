import { useState } from "react";
import type { FilterFunctionType } from "../../types/search/FilterFunctionType"

interface NewsSearchBarProps {
  onSearch: (filter: FilterFunctionType) => void,
}

function createFilterFunction(searchTerm: string, orderByTime: boolean): FilterFunctionType {
  return (vesti) => {
    if(orderByTime){
      vesti.sort(
				(a, b) => b.vreme < a.vreme ? -1 : b.vreme > a.vreme ? 1 : 0
			);
    }else{
      vesti.sort(
        (a, b) => b.brPregleda - a.brPregleda
      );
    }

    return vesti.filter((vest) => {
      if(searchTerm.startsWith("#")){
        for(const tag of vest.tags){
          if(tag.toLowerCase().includes(searchTerm.toLowerCase().substring(1))){
            return true;
          }
        }
        return false;
      }else{
        let naslovIncludes = vest.naslov.toLowerCase().includes(searchTerm.toLowerCase());
        let tekstIncludes = vest.tekst.toLowerCase().includes(searchTerm.toLowerCase());
        
        return naslovIncludes || tekstIncludes;
      }
    });
  }
}

const NewsSearchBar: React.FC<NewsSearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderByTime, setOrderByTime] = useState(true);

  return (
		<div className="flex items-center justify-center space-x-2 w-full max-w-md mb-6">
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => {
					const value = e.target.value;
					setSearchTerm(value);
					onSearch(createFilterFunction(value, orderByTime));
				}}
				placeholder="Pretraži vesti..."
				className="flex-5 grow block rounded-md border border-gray-300 px-3 py-2
           focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
			/>
			<button
				className="flex-1 text-center rounded-md grow-0 bg-blue-600 px-2 py-1 text-white hover:bg-blue-700 m-2
           focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => {
          setOrderByTime(!orderByTime);
          onSearch(createFilterFunction(searchTerm, !orderByTime));
        }}
      >
				{orderByTime ? "Najnovije" : "Najpopularnije"}
			</button>
		</div>
	);
}

export default NewsSearchBar;