import { Link } from "react-router";
import useFetchSolution from "../hooks/useFetchSolution";

export default function GenreDropdown() {
  const initialUrl =
    "https://api.rawg.io/api/genres?key=3972b664afd44ec09eb4c1465577150d";

  const { data: genres, loading, error } = useFetchSolution(initialUrl);

  return (
    <details className="group">
      <summary className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors list-none">
        Genere
        <span className="transition-transform group-open:rotate-180">▾</span>
      </summary>

      <div className="mt-2 max-h-64 overflow-auto rounded-lg border border-slate-800 bg-slate-950">
        {loading && (
          <p className="px-3 py-2 text-sm text-slate-400">Loading...</p>
        )}

        {error && (
          <p className="px-3 py-2 text-sm text-rose-400">{error}</p>
        )}

        <ul className="divide-y divide-slate-800">
          {genres &&
            genres.results.map((genre) => (
              <li key={genre.id}>
                <Link
                  to={`/genre/${genre.slug}`}
                  className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  {genre.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </details>
  );
}