import { useEffect, useState } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase-client";

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
    };

    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
}