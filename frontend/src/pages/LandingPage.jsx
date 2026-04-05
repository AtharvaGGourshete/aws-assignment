import { Link } from "react-router-dom";

const categories = ["Football", "Cricket", "Running", "Basketball", "Fitness", "Tennis"];

const featuredReasons = [
  {
    index: "01",
    title: "Performance-first picks",
    text: "Browse equipment selected for training, match day, recovery, and everyday practice."
  },
  {
    index: "02",
    title: "Clear buying flow",
    text: "Move from discovery to product details and checkout without distractions or visual clutter."
  },
  {
    index: "03",
    title: "Built for repeat visits",
    text: "Quick category jumps, bold product cards, and focused detail pages make shopping faster."
  }
];

const landingHighlights = [
  {
    title: "Fast browsing",
    text: "Search by category, compare products quickly, and keep your momentum from page to page.",
    tone: "bg-white"
  },
  {
    title: "Clean product detail",
    text: "Get pricing, stock, specs, and related picks in one sharp layout without unnecessary noise.",
    tone: "bg-aqua"
  },
  {
    title: "Quick purchase flow",
    text: "Sign in once, review your cart, add shipping details, and place your order in a focused checkout.",
    tone: "bg-lemon"
  }
];

const categoryStories = [
  ["Football", "Training balls, match essentials, and grip-focused gear built for regular sessions."],
  ["Cricket", "Bats and equipment shaped for clean pickup, confident strokes, and long net practice."],
  ["Running", "Shoes and movement gear that prioritize comfort, responsiveness, and everyday mileage."],
  ["Fitness", "Recovery and workout essentials designed for home setups and repeat-use routines."]
];

const LandingPage = () => {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-20">
        <div className="space-y-8">
          <div className="inline-flex border border-ink bg-lemon px-4 py-2 text-xs font-bold uppercase tracking-[0.35em]">
            Sports equipment store
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-extrabold uppercase leading-none md:text-7xl">
              Sharp gear. Fast checkout. Made for people who move.
            </h1>
            <p className="max-w-2xl text-lg text-zinc-700">
              Sporty brings together focused equipment discovery, bold product presentation, and a
              simple purchase experience for athletes, beginners, and everyday fitness routines.
            </p>
            <p className="max-w-2xl text-base text-zinc-600">
              Whether you are picking up your next training essential, replacing match-day gear, or
              building a cleaner workout setup, the storefront is designed to help you decide fast
              and shop with confidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="border border-ink bg-aqua px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] shadow-sharp transition hover:-translate-x-1 hover:-translate-y-1"
            >
              Explore products
            </Link>
            <Link
              to="/auth"
              className="border border-ink bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-lemon"
            >
              Start shopping
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredReasons.map((item) => (
              <article key={item.title} className="border border-ink bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">{item.index}</p>
                <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
                <p className="mt-3 text-sm text-zinc-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px] border border-ink bg-white shadow-sharp">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(35,240,199,0.25),transparent_55%),linear-gradient(315deg,rgba(239,118,122,0.2),transparent_50%)]" />
          <div className="relative flex h-full flex-col justify-between p-6">
            <div className="flex justify-between">
              <span className="border border-ink bg-coral px-3 py-2 text-xs font-bold uppercase tracking-[0.3em]">
                New arrivals
              </span>
              <span className="border border-ink bg-white px-3 py-2 text-xs font-semibold">
                Sharp essentials
              </span>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-ink bg-aqua p-4">
                  <p className="text-sm font-medium uppercase tracking-[0.3em]">Categories</p>
                  <p className="mt-3 text-5xl font-extrabold">06</p>
                </div>
                <div className="border border-ink bg-lemon p-4">
                  <p className="text-sm font-medium uppercase tracking-[0.3em]">Focused flow</p>
                  <p className="mt-3 text-5xl font-extrabold">Fast</p>
                </div>
              </div>

              <div className="border border-ink bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
                  Featured sports
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="border border-ink px-3 py-2 text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-ink bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
                  Shopping rhythm
                </p>
                <div className="mt-4 space-y-3 text-sm text-zinc-700">
                  <div className="flex items-center justify-between border border-ink px-4 py-3">
                    <span>Explore categories</span>
                    <span className="font-semibold">01</span>
                  </div>
                  <div className="flex items-center justify-between border border-ink px-4 py-3">
                    <span>Review product details</span>
                    <span className="font-semibold">02</span>
                  </div>
                  <div className="flex items-center justify-between border border-ink px-4 py-3">
                    <span>Checkout and confirm</span>
                    <span className="font-semibold">03</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-ink bg-ink p-5 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">Storefront tone</p>
              <p className="mt-3 text-2xl font-bold">Minimal layout, sharp corners, bold contrast.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3 md:px-8">
          {landingHighlights.map((item) => (
            <div key={item.title} className={`border border-ink p-6 ${item.tone}`}>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-zinc-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-ink bg-lemon p-8 shadow-sharp">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-700">Why people choose sporty</p>
            <h2 className="mt-4 text-4xl font-extrabold uppercase leading-tight">
              A cleaner way to shop sports equipment online.
            </h2>
            <p className="mt-5 text-base text-zinc-700">
              Every page is built to reduce friction. Product cards stay readable, details stay
              organized, and the checkout experience stays focused so the browsing journey never
              feels heavy.
            </p>
            <p className="mt-4 text-base text-zinc-700">
              The result is a storefront that feels fast on first visit and easy to return to when
              you need your next piece of gear.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {categoryStories.map(([title, text]) => (
              <article key={title} className="border border-ink bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">{title}</p>
                <p className="mt-4 text-lg font-semibold leading-relaxed text-zinc-800">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
