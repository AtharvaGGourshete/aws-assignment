import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-ink bg-white shadow-sharp transition hover:-translate-x-1 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden border-b border-ink">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className="absolute left-4 top-4 border border-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ backgroundColor: product.accent_color }}
        >
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-2 text-sm text-zinc-600">{product.short_description}</p>
          </div>
          <div className="border border-ink bg-mist px-3 py-2 text-sm font-semibold">
            {product.rating}★
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold">${Number(product.price).toFixed(2)}</p>
          <div className="flex gap-2">
            <Link
              to={`/products/${product.id}`}
              className="border border-ink px-4 py-2 text-sm font-semibold transition hover:bg-lemon"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="border border-ink bg-aqua px-4 py-2 text-sm font-semibold transition hover:bg-lemon"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
