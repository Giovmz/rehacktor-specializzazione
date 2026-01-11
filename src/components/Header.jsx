import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase-client";
import SessionContext from "../context/SessionContext";

export default function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-white/90 transition hover:text-white"
        >
          Rehacktor
        </Link>

        <nav className="flex items-center gap-2">
          {session ? (
            <div className="relative">
              <details className="group">
                <summary className="cursor-pointer list-none select-none rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white">
                  Account
                </summary>

                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-lg">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    Settings
                  </Link>
                  <button
                    type="button"
                    onClick={signOut}
                    className="block w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </details>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}