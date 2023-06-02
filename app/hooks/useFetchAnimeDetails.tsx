import { useState, useEffect } from 'react';

type Episode = {
  id: number;
  title: string;
  thumbnailUrl: string;
};

export const useFetchAnimeDetails = (animeId: number): { data: Episode[]; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`https://yourapi.com/anime/${animeId}/episodes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [animeId]);

  return { data, loading, error };
};