import { useEffect } from "react";
import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=3972b664afd44ec09eb4c1465577150d`;

  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [initialUrl, updateUrl]);

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}

      {data && (
        <div className="style-game-page">
          <div className="style-game-info">
            <h1>{data.name}</h1>
            <p>{data.released}</p>
            <p>{data.rating}</p>
            <p>{data.description_raw}</p>
          </div>

          <div className="style-game-image">
            <img src={data.background_image} alt="" />
          </div>
        </div>
      )}
    </>
  );
}