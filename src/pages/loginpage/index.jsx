import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../../supabase-client";
import { ConfSchemaLogin, getErrors, getFieldError } from "../../libs/validationForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const FORGOT_PASSWORD_URL = "https://www.youtube.com/watch?v=xvFZjo5PgG0&autoplay=1";

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const { error, data } = ConfSchemaLogin.safeParse(formState);
    if (error) {
      setFormErrors(getErrors(error));
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (signInError) {
      alert("Credenziali non valide.");
      return;
    }

    navigate("/");
  };

  const onBlur = (property) => {
    const message = getFieldError(property, formState[property], ConfSchemaLogin);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (!formSubmitted && !touchedFields[property]) return false;
    return Boolean(formErrors[property]);
  };

  const setField = (property) => (e) => {
    setFormState((prev) => ({ ...prev, [property]: e.target.value }));
  };

  const emailInvalid = useMemo(
    () => isInvalid("email"),
    [formSubmitted, touchedFields, formErrors]
  );

  const passwordInvalid = useMemo(
    () => isInvalid("password"),
    [formSubmitted, touchedFields, formErrors]
  );

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-white">Accedi</h1>
        <p className="mt-2 text-sm text-white/60">
          Entra per salvare i tuoi giochi preferiti e usare la chat in tempo reale
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-white/80">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formState.email}
              onChange={setField("email")}
              onBlur={() => onBlur("email")}
              aria-invalid={emailInvalid}
              placeholder="nome@email.com"
              className={[
                "w-full rounded-xl border bg-black/30 px-3 py-2 text-white outline-none transition",
                emailInvalid
                  ? "border-rose-400/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                  : "border-white/10 focus:border-white/25 focus:ring-2 focus:ring-white/10",
              ].join(" ")}
              required
            />
            {formErrors.email && (
              <small className="mt-1 block text-red-300">{formErrors.email}</small>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-white/80"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formState.password}
                onChange={setField("password")}
                onBlur={() => onBlur("password")}
                aria-invalid={passwordInvalid}
                placeholder="••••••••"
                className={[
                  "w-full rounded-xl border bg-black/30 px-3 py-2 pr-20 text-white outline-none transition",
                  passwordInvalid
                    ? "border-rose-400/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                    : "border-white/10 focus:border-white/25 focus:ring-2 focus:ring-white/10",
                ].join(" ")}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white"
              >
                {showPassword ? "Nascondi" : "Mostra"}
              </button>
            </div>

            {formErrors.password && (
              <small className="mt-1 block text-red-300">{formErrors.password}</small>
            )}

            <div className="mt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => window.location.assign(FORGOT_PASSWORD_URL)}
                className="text-xs text-white/60 hover:text-white"
              >
                Password dimenticata?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-white px-4 py-2 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Accesso..." : "Entra"}
          </button>

          <div className="pt-2 text-center text-sm text-white/60">
            Non hai un account?{" "}
            <Link to="/register" className="text-white hover:underline">
              Registrati
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}