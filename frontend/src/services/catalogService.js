import { fallbackProducts } from "../data/fallbackProducts";
import { supabase } from "../lib/supabase";

const normalizeProduct = (product) => ({
  ...product,
  price: Number(product.price),
  rating: Number(product.rating),
  stock: Number(product.stock),
  specs:
    typeof product.specs === "string"
      ? JSON.parse(product.specs || "{}")
      : product.specs || {}
});

const getFallbackCategories = () => [
  ...new Set(fallbackProducts.map((product) => product.category))
];

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, category, price, rating, stock, image_url, accent_color, short_description, description, specs, featured"
    )
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return fallbackProducts;
  }

  return data.map(normalizeProduct);
};

export const getCategories = async () => {
  const products = await getProducts();
  return [...new Set(products.map((product) => product.category))];
};

export const getProductById = async (productId) => {
  const numericId = Number(productId);
  const { data, error } = await supabase.from("products").select("*").eq("id", numericId).single();

  if (error || !data) {
    const fallbackProduct = fallbackProducts.find((item) => item.id === numericId);
    const relatedProducts = fallbackProducts.filter(
      (item) => item.category === fallbackProduct?.category && item.id !== numericId
    );
    return {
      product: fallbackProduct || null,
      relatedProducts
    };
  }

  const product = normalizeProduct(data);
  const { data: relatedData } = await supabase
    .from("products")
    .select(
      "id, name, category, price, rating, stock, image_url, accent_color, short_description, description, specs, featured"
    )
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(3);

  return {
    product,
    relatedProducts: (relatedData || []).map(normalizeProduct)
  };
};
