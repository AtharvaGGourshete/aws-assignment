import { supabase } from "../lib/supabase";

const SHIPPING_FEE = 12;

export const createOrder = async ({ items, shipping, userId }) => {
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const total = subtotal + (items.length > 0 ? SHIPPING_FEE : 0);

  const { data: insertedOrder, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      total,
      status: "confirmed",
      shipping_name: shipping.fullName,
      shipping_email: shipping.email,
      shipping_address: shipping.address,
      city: shipping.city,
      postal_code: shipping.postalCode,
      country: shipping.country
    })
    .select("id, total, status, created_at")
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  const orderItems = items.map((item) => ({
    order_id: insertedOrder.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: Number(item.price)
  }));

  const { error: itemError } = await supabase.from("order_items").insert(orderItems);

  if (itemError) {
    throw new Error(itemError.message);
  }

  for (const item of items) {
    const nextStock = Math.max(0, Number(item.stock) - item.quantity);
    const { error: stockError } = await supabase
      .from("products")
      .update({ stock: nextStock })
      .eq("id", item.id);

    if (stockError) {
      throw new Error(stockError.message);
    }
  }

  return insertedOrder;
};
