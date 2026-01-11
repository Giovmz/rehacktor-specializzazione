import { useEffect } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function GenrePage() {
  const { genre } = useParams();

  const initialUrl = `https://api.rawg.io/api/games?key=3972b664afd44ec09eb4c1465577150d&genres=${genre}&page=1`;

  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [initialUrl, updateUrl]);

  return (
    <>
      <h2 className="mb-6">Genere {genre}:</h2>

      <div className="grid-games-list">
        {loading && <article>Loading...</article>}
        {error && <article>{error}</article>}

        {data &&
          data.results.map((game) => (
            <CardGame key={game.id} game={game} />
          ))}
      </div>
    </>
  );
}