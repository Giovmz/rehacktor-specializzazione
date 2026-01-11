import { useEffect, useRef, useState, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../supabase-client";

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getInitialMessages = useCallback(async () => {
    if (!data) return;

    setLoadingInitial(true);
    setError(null);

    const { data: rows, error: err } = await supabase
      .from("messages")
      .select("*")
      .eq("game_id", data)
      .order("created_at", { ascending: true });

    if (err) {
      setError(err.message);
      setLoadingInitial(false);
      return;
    }

    setMessages(rows || []);
    setLoadingInitial(false);
  }, [data]);

  useEffect(() => {
    getInitialMessages();
  }, [getInitialMessages]);

  useEffect(() => {
    if (!data) return;

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          getInitialMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [data, getInitialMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">Realtime</h3>
        <span className="text-xs text-white/50">
          {messages.length} messaggi
        </span>
      </div>

      {loadingInitial && (
        <p className="text-sm text-white/60">Caricamento messaggi...</p>
      )}
      {error && <p className="text-sm text-red-300">{error}</p>}

      <div className="max-h-64 space-y-2 overflow-auto rounded-xl border border-white/10 bg-black/20 p-3">
        {messages.map((m) => (
          <div key={m.id} className="rounded-xl bg-white/5 px-3 py-2">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-white/80">
                {m.profile_username}
              </span>
              <span className="text-xs text-white/40">
                {dayjs(m.created_at).fromNow()}
              </span>
            </div>
            <p className="mt-1 text-sm text-white/90">{m.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}