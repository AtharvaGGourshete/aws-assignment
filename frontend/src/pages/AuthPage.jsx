import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/products";

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await signup(form);
      }
      navigate(redirectPath);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:px-8">
      <div className="border border-ink bg-white p-8 shadow-sharp">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">Account access</p>
        <h1 className="mt-4 text-4xl font-extrabold uppercase">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-4 max-w-lg text-zinc-600">
          Use this page for secure login and signup before you purchase products.
        </p>

        <div className="mt-8 inline-flex border border-ink">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] ${
              mode === "login" ? "bg-aqua" : "bg-white"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`border-l border-ink px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] ${
              mode === "signup" ? "bg-lemon" : "bg-white"
            }`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {mode === "signup" && (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Full name</span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-none border border-ink bg-white px-4 py-3 outline-none focus:bg-mist"
                placeholder="Alex Jordan"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-none border border-ink bg-white px-4 py-3 outline-none focus:bg-mist"
              placeholder="alex@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-none border border-ink bg-white px-4 py-3 outline-none focus:bg-mist"
              placeholder="At least 6 characters"
            />
          </label>

          {error ? <p className="border border-ink bg-coral px-4 py-3 text-sm">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-ink bg-aqua px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-lemon disabled:cursor-not-allowed disabled:bg-zinc-200"
          >
            {loading ? "Processing..." : mode === "login" ? "Login now" : "Create account"}
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        <div className="border border-ink bg-lemon p-8">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-700">Why sign in</p>
          <h2 className="mt-4 text-3xl font-extrabold uppercase">Unlock quick checkout</h2>
          <p className="mt-4 text-zinc-700">
            Save your identity, protect orders, and move directly from product discovery to purchase.
          </p>
        </div>
        <div className="border border-ink bg-white p-8">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">Member benefits</p>
          <div className="mt-4 space-y-4 text-zinc-700">
            <p>Keep checkout details close at hand and move through the store without interruption.</p>
            <p>Sign in once to manage your shopping flow with less friction and faster order placement.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
