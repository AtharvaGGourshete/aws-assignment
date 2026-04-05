import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/catalogService";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="border border-ink bg-coral p-6">{error || "Product not found."}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden border border-ink bg-white shadow-sharp">
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6 border border-ink bg-white p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="border border-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ backgroundColor: product.accent_color }}
            >
              {product.category}
            </span>
            <span className="border border-ink bg-mist px-4 py-2 text-sm font-semibold">
              {product.rating}★ rated
            </span>
          </div>

          <div>
            <h1 className="text-4xl font-extrabold uppercase">{product.name}</h1>
            <p className="mt-4 text-lg text-zinc-700">{product.description}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-ink bg-aqua p-4">
              <p className="text-xs uppercase tracking-[0.3em]">Price</p>
              <p className="mt-2 text-3xl font-extrabold">${Number(product.price).toFixed(2)}</p>
            </div>
            <div className="border border-ink bg-lemon p-4">
              <p className="text-xs uppercase tracking-[0.3em]">Stock</p>
              <p className="mt-2 text-3xl font-extrabold">{product.stock}</p>
            </div>
            <div className="border border-ink bg-white p-4">
              <p className="text-xs uppercase tracking-[0.3em]">Ready for</p>
              <p className="mt-2 text-xl font-bold">{product.category} sessions</p>
            </div>
          </div>

          <div className="grid gap-3">
            {Object.entries(product.specs || {}).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between border border-ink px-4 py-3">
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">{key.replace("_", " ")}</span>
                <span className="text-sm text-zinc-700">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-ink">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="px-4 py-3 font-bold"
              >
                -
              </button>
              <span className="border-x border-ink px-5 py-3 font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
                className="px-4 py-3 font-bold"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product, quantity)}
              className="border border-ink bg-aqua px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-lemon"
            >
              Add to cart
            </button>
            <Link
              to="/checkout"
              className="border border-ink bg-coral px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] transition hover:bg-lemon"
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 ? (
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-extrabold uppercase">Related products</h2>
            <Link to="/products" className="border border-ink px-4 py-2 text-sm font-semibold hover:bg-lemon">
              Back to catalog
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default ProductDetailsPage;
