import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../services/catalogService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [filters, setFilters] = useState({ category: "All", search: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productList, categoryList]) => {
        setProducts(productList);
        setCategories(["All", ...categoryList]);
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const byCategory = filters.category === "All" || product.category === filters.category;
    const bySearch =
      filters.search.trim() === "" ||
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.search.toLowerCase());

    return byCategory && bySearch;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="flex flex-col gap-8 border border-ink bg-white p-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">Explore products</p>
          <h1 className="mt-4 text-4xl font-extrabold uppercase">Find your next training essential</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-[220px_280px]">
          <select
            value={filters.category}
            onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
            className="border border-ink bg-mist px-4 py-3 outline-none"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <input
            value={filters.search}
            onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
            placeholder="Search equipment"
            className="border border-ink bg-mist px-4 py-3 outline-none"
          />
        </div>
      </div>

      {loading ? <p className="py-12 text-lg font-medium">Loading products...</p> : null}
      {error ? <p className="mt-8 border border-ink bg-coral px-4 py-4">{error}</p> : null}

      {!loading && !error ? (
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ProductsPage;
