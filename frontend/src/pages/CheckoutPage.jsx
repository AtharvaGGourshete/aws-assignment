import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

const initialShipping = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: ""
};

const CheckoutPage = () => {
  const { items, summary, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    ...initialShipping,
    fullName: user?.fullName || "",
    email: user?.email || ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      const order = await createOrder({
        items,
        shipping,
        userId: user.id
      });

      clearCart();
      navigate("/success", { state: { order } });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">Purchase page</p>
        <h1 className="mt-4 text-4xl font-extrabold uppercase">Checkout your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="grid gap-4 border border-ink bg-white p-4 md:grid-cols-[140px_1fr]">
              <img src={item.image_url} alt={item.name} className="h-36 w-full border border-ink object-cover" />
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                    <p className="text-sm text-zinc-600">{item.category}</p>
                  </div>
                  <p className="text-2xl font-extrabold">${Number(item.price).toFixed(2)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-ink">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-4 py-3 font-bold"
                    >
                      -
                    </button>
                    <span className="border-x border-ink px-5 py-3 font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-4 py-3 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="border border-ink bg-coral px-4 py-3 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}

          {items.length === 0 ? (
            <div className="border border-ink bg-white p-8 text-lg font-medium">
              Add products before placing an order.
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="border border-ink bg-white p-6 shadow-sharp">
            <h2 className="text-2xl font-bold uppercase">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>${summary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-ink pt-4 text-lg font-bold">
                <span>Total</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-4 border border-ink bg-white p-6">
            <h2 className="text-2xl font-bold uppercase">Shipping details</h2>
            {Object.entries(shipping).map(([key, value]) => (
              <input
                key={key}
                value={value}
                onChange={(event) =>
                  setShipping((current) => ({ ...current, [key]: event.target.value }))
                }
                placeholder={key.replace(/([A-Z])/g, " $1")}
                className="w-full border border-ink bg-mist px-4 py-3 capitalize outline-none"
              />
            ))}
            {error ? <p className="border border-ink bg-coral px-4 py-3 text-sm">{error}</p> : null}
            <button
              type="submit"
              disabled={submitting || items.length === 0}
              className="w-full border border-ink bg-aqua px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-lemon disabled:cursor-not-allowed disabled:bg-zinc-200"
            >
              {submitting ? "Placing order..." : "Place order"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
