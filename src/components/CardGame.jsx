import { Link } from "react-router";
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function CardGame({ game }) {
  const genres = game.genres?.map((g) => g.name).join(", ");

  return (
    <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40 shadow-sm">
      <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {game.background_image ? (
          <LazyLoadGameImage image={game.background_image} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <strong className="block line-clamp-2 text-base text-slate-100">
          {game.name}
        </strong>

        <div className="text-sm text-slate-400">
          {genres ? <small className="block">{genres}</small> : null}
          {game.released ? <small className="block">Released: {game.released}</small> : null}
        </div>

        <div className="pt-2">
          <Link
            to={`/game/${game.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white"
          >
            Dettagli
          </Link>
        </div>
      </div>
    </article>
  );
}