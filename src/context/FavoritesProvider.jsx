import { useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabase-client";
import { SessionContext } from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

export default function FavoritesProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = useCallback(async () => {
    if (!session?.user?.id) return;

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", session.user.id);

    if (error) return;
    setFavorites(data || []);
  }, [session]);

  const addFavorites = async (game) => {
    if (!session?.user?.id) return;

    const payload = {
      user_id: session.user.id,
      game_id: game.id,
      game_name: game.name,
      game_image: game.background_image,
    };

    const { data, error } = await supabase.from("favorites").insert(payload).select();

    if (error) return;
    if (data?.length) setFavorites((prev) => [...prev, data[0]]);
  };

  const removeFavorite = async (gameId) => {
    if (!session?.user?.id) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", session.user.id);

    if (error) return;
    setFavorites((prev) => prev.filter((f) => f.game_id !== gameId));
  };

  useEffect(() => {
    if (!session?.user?.id) {
      setFavorites([]);
      return;
    }

    getFavorites();

    const channel = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => getFavorites()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, getFavorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, getFavorites, addFavorites, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}