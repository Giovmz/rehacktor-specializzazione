import { useState } from "react";
import { useNavigate } from "react-router";

export default function Searchbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [ariaInvalid, setAriaInvalid] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();

    if (typeof search === "string" && search.trim().length !== 0) {
      navigate(`/search?query=${search}`);
      setSearch("");
    } else {
      setAriaInvalid(true);
    }
  };

return (
  <form onSubmit={handleSearch} className="space-y-2">
    <label className="block text-sm font-medium text-slate-200">Ricerca</label>

    <div className="flex gap-2">
      <input
        type="text"
        placeholder={ariaInvalid ? "Scrivi qui" : "Search a game"}
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        aria-invalid={ariaInvalid}
        className={[
          "w-full rounded-lg border bg-slate-950 px-3 py-2 text-slate-100 outline-none",
          ariaInvalid
            ? "border-rose-500 focus:ring-2 focus:ring-rose-500/40"
            : "border-slate-800 focus:ring-2 focus:ring-sky-500/40",
        ].join(" ")}
      />

<button
  type="submit"
  className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
>
  Vai
</button>

    </div>

    {ariaInvalid && (
      <p className="text-sm text-rose-400">Inserisci almeno un carattere per cercare qualcosa...</p>
    )}
  </form>
);

}