import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import supabase from "../supabase-client";
import { SessionContext } from "../context/SessionContext";

export default function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const detailsRef = useRef(null);

  const closeMenu = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!detailsRef.current) return;
      if (!detailsRef.current.contains(e.target)) closeMenu();
    };

    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    closeMenu();
    navigate("/");
  };

  const goToAccount = () => {
    closeMenu();
    navigate("/account");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-white/90 transition hover:text-white"
        >
          Rehacktor
        </Link>

        <nav className="flex items-center gap-3">
          {session ? (
            <div className="relative">
              <details ref={detailsRef} className="group">
                <summary className="cursor-pointer list-none rounded-xl bg-white/10 px-3 py-2 text-sm text-white/90 ring-1 ring-white/10 transition hover:bg-white/15">
                  Profilo
                </summary>

                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-2 shadow-lg backdrop-blur">
                  <button
                    type="button"
                    onClick={goToAccount}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Impostazioni
                  </button>

                  <button
                    type="button"
                    onClick={signOut}
                    className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Uscita
                  </button>
                </div>
              </details>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
              >
                Accedi
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
              >
                Registrati
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}