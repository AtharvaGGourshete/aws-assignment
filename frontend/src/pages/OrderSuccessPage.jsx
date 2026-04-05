import { Link, useLocation } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <div className="border border-ink bg-white p-8 shadow-sharp">
        <div className="inline-flex border border-ink bg-aqua px-4 py-2 text-xs font-bold uppercase tracking-[0.35em]">
          Order confirmed
        </div>
        <h1 className="mt-6 text-5xl font-extrabold uppercase">Purchase complete</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-700">
          Your sports gear order has been placed successfully and is ready for processing.
        </p>

        {order ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="border border-ink bg-lemon p-4">
              <p className="text-xs uppercase tracking-[0.3em]">Order ID</p>
              <p className="mt-2 text-2xl font-bold">#{order.id}</p>
            </div>
            <div className="border border-ink bg-aqua p-4">
              <p className="text-xs uppercase tracking-[0.3em]">Total</p>
              <p className="mt-2 text-2xl font-bold">${Number(order.total).toFixed(2)}</p>
            </div>
            <div className="border border-ink bg-white p-4">
              <p className="text-xs uppercase tracking-[0.3em]">Status</p>
              <p className="mt-2 text-2xl font-bold capitalize">{order.status}</p>
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/products"
            className="border border-ink bg-aqua px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-lemon"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="border border-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-lemon"
          >
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccessPage;
