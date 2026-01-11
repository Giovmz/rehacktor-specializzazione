import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase-client";
import { ConfSchemaLogin, getErrors, getFieldError } from "../../libs/validationForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [formErrors, setFormErrors] = useState({});
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

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (signInError) {
      alert("Signin error");
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

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-6 text-2xl font-semibold text-white">Login</h1>

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
              aria-invalid={isInvalid("email")}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-white/30"
              required
            />
            {formErrors.email && <small className="text-red-300">{formErrors.email}</small>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-white/80">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formState.password}
              onChange={setField("password")}
              onBlur={() => onBlur("password")}
              aria-invalid={isInvalid("password")}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-white/30"
              required
            />
            {formErrors.password && (
              <small className="text-red-300">{formErrors.password}</small>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-2 font-medium text-black hover:bg-white/90"
          >
            Entra
          </button>
        </form>
      </div>
    </div>
  );
}