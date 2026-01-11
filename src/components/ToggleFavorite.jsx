import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";
import { SessionContext } from "../context/SessionContext";

export default function ToggleFavorite({ data }) {
  const { session } = useContext(SessionContext);
  const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);

  if (!session) return null;

  const isFavorite = favorites.find((el) => el.game_id === data.id);

  return (
    <div className="flex items-center gap-2">
      {isFavorite ? (
        <button
          type="button"
          onClick={() => removeFavorite(data.id)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          <FaHeart className="text-red-400" />
          Rimuovi
        </button>
      ) : (
        <button
          type="button"
          onClick={() => addFavorites(data)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          <FaRegHeart />
          Salva
        </button>
      )}
    </div>
  );
}