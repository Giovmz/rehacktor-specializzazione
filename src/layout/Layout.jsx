import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <Header />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <Sidebar />
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <Searchbar />
            </div>
          </aside>

          <main className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}