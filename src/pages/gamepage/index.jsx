import { useEffect } from "react";
import { useParams, Link } from "react-router";
import LazyLoadGameImage from "../../components/LazyLoadGameImage";
import useFetchSolution from "../../hooks/useFetchSolution";
import Chatbox from "../../components/Chatbox";
import RealtimeChat from "../../components/RealtimeChat";
import ToggleFavorite from "../../components/ToggleFavorite";

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_KEY}`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const genres = data?.genres?.map((g) => g.name).join(", ");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {loading && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          Loading...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-red-300">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40 shadow-sm">
            <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900">
              {data.background_image ? (
                <LazyLoadGameImage image={data.background_image} />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  No image
                </div>
              )}
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <strong className="block line-clamp-2 text-base text-slate-100">
                  {data.name}
                </strong>

                <ToggleFavorite data={data} />
              </div>

              <div className="text-sm text-slate-400">
                {genres ? <small className="block">{genres}</small> : null}
                {data.released ? (
                  <small className="block">Released: {data.released}</small>
                ) : null}
              </div>

              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white"
                >
                  Torna alla Home
                </Link>
              </div>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <Chatbox data={Number(id)} />
            <RealtimeChat data={Number(id)} />
          </div>
        </div>
      )}
    </div>
  );
}