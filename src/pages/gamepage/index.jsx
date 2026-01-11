import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";
import Chatbox from "../../components/Chatbox";
import RealtimeChat from "../../components/RealtimeChat";

export default function GamePage() {
  const { id } = useParams();

  const initialUrl = `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_RAWG_KEY}`;

  const { data, loading, error } = useFetchSolution(initialUrl);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
        <>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <CardGame game={data} />

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <Chatbox data={Number(id)} />
              <RealtimeChat data={Number(id)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}