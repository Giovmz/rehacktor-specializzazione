import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function HomePage() {
  const initialUrl =
    "https://api.rawg.io/api/games?key=3972b664afd44ec09eb4c1465577150d&dates=2024-01-01,2024-12-31&page=1";

  const { data, loading, error } = useFetchSolution(initialUrl);

return (
  <>
    <div className="mb-4 flex items-end justify-between gap-3">
      <h1 className="text-2xl font-bold text-slate-100">Catalogo</h1>
      <span className="text-sm text-slate-400">RAWG · API</span>
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