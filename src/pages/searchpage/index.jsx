import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const game = searchParams.get("query");

  const initialUrl = `https://api.rawg.io/api/games?key=3972b664afd44ec09eb4c1465577150d&search=${game}`;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [initialUrl, updateUrl]);

return (
  <>
    <div className="mb-4">
      <h1 className="text-2xl font-bold text-slate-100">
        Risultati per <span className="text-sky-400">{game}</span>
      </h1>
    </div>

    {loading && <p className="text-slate-300">Loading...</p>}
    {error && <p className="text-rose-400">{error}</p>}

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data &&
        data.results.map((game) => <CardGame key={game.id} game={game} />)}
    </div>
  </>
);

}