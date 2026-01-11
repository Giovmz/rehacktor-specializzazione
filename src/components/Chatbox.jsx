import { useContext } from "react";
import supabase from "../supabase-client";
import { SessionContext } from "../context/SessionContext";

export default function Chatbox({ data }) {
  const { session } = useContext(SessionContext);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message")?.trim();

    if (!message) return;

    const user = session?.user;
    if (!user) return;

    const { error } = await supabase.from("messages").insert({
      profile_id: user.id,
      profile_username: user.user_metadata?.username ?? user.email,
      game_id: data,
      content: message,
    });

    if (!error) event.currentTarget.reset();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="mb-3 text-sm font-semibold text-white/90">Chat</h3>

      {!session ? (
        <p className="text-sm text-white/60">
          Devi essere loggato per scrivere in chat.
        </p>
      ) : (
        <form onSubmit={handleMessageSubmit} className="flex gap-2">
          <input
            name="message"
            type="text"
            placeholder="Chat..."
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none placeholder:text-white/30 focus:border-white/20"
          />
          <button
            type="submit"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/10 transition hover:bg-white/15"
          >
            Invia
          </button>
        </form>
      )}
    </div>
  );
}