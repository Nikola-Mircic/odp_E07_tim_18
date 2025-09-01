import { useEffect, useState } from "react";

const useFetch = <T,>(fetchFunc : () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);

            const result = await fetchFunc();

            setData(result);
        } catch(e) {
            // @ts-ignore
            setError(e instanceof Error? e : new Error("Error while fetching data!"));
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return {
        data,
        loading,
        error
    }
}

export default useFetch;