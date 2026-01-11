import { useEffect, useState, useContext } from "react";
import supabase from "../../supabase-client";
import { SessionContext } from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import Avatar from "../../components/Avatar";
import { FaTrashAlt } from "react-icons/fa";

export default function AccountPage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

        const user = session?.user;
        if (!user) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("username, first_name, last_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setUsername(data?.username ?? "");
        setFirstName(data?.first_name ?? "");
        setLastName(data?.last_name ?? "");
        setAvatarUrl(data?.avatar_url ?? "");
      } catch (e) {
        alert(e?.message ?? "Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session]);

  const updateProfile = async (event, nextAvatarUrl = null) => {
    event?.preventDefault?.();

    try {
      setLoading(true);

      const user = session?.user;
      if (!user) return;

      const updates = {
        id: user.id,
        username: username || null,
        first_name: firstName || null,
        last_name: lastName || null,
        avatar_url: nextAvatarUrl ?? avatarUrl ?? null,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;

      if (nextAvatarUrl !== null) setAvatarUrl(nextAvatarUrl);
      alert("Profile updated");
    } catch (e) {
      alert(e?.message ?? "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
          Devi effettuare l'accesso per poter accedere al contenuto di questa pagina.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Account</h1>
        <p className="mt-1 text-sm text-white/60">
          Gestisci le informazioni del profilo
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <form onSubmit={(e) => updateProfile(e, null)} className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Avatar
              url={avatarUrl}
              size={96}
              onUpload={(url) => updateProfile(null, url)}
            />

            <div className="text-right">
              <p className="text-xs text-white/50">Email</p>
              <p className="text-sm text-white/90">{session.user.email}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none placeholder:text-white/30 focus:border-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/70">Nome</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none placeholder:text-white/30 focus:border-white/20"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-white/70">Cognome</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none placeholder:text-white/30 focus:border-white/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/10 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Loading..." : "Aggiorna"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Preferiti</h2>
          <p className="mt-1 text-sm text-white/60">
            I giochi che hai salvato
          </p>
        </div>

        {favorites?.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {favorites.map((game) => (
              <div
                key={`${game.user_id}-${game.game_id}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={game.game_image}
                    alt={game.game_name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 p-3">
                  <p className="line-clamp-1 text-sm font-medium text-white">
                    {game.game_name}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFavorite(game.game_id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10"
                  >
                    <FaTrashAlt />
                    Rimuovi
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
            Non ci sono preferiti attualmente.
          </div>
        )}
      </div>
    </div>
  );
}