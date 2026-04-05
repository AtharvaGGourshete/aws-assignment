import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
    <div className="border border-ink bg-white p-8 shadow-sharp">
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">404</p>
      <h1 className="mt-4 text-5xl font-extrabold uppercase">Page not found</h1>
      <p className="mt-4 text-zinc-700">The page you requested does not exist in this storefront.</p>
      <Link
        to="/"
        className="mt-8 inline-flex border border-ink bg-aqua px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-lemon"
      >
        Return home
      </Link>
    </div>
  </section>
);

export default NotFoundPage;
