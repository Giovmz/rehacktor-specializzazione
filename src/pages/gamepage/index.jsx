import { useEffect } from "react";
import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_KEY}`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [id]);

  if (loading) return <div className="p-6 text-white/70">Loading...</div>;
  if (error) return <div className="p-6 text-red-300">{error}</div>;
  if (!data) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">{data.name}</h1>
          <p className="mt-1 text-sm text-white/60">
            {data.released} · Rating {data.rating}
          </p>
        </div>

        <ToggleFavorite data={data} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-white/70">Descrizione</p>
          <div
            className="prose prose-invert mt-3 max-w-none text-white/80"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src={data.background_image} alt={data.name} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}