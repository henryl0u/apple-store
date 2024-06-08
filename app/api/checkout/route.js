import { NextResponse } from "next/server";
import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";
import Order from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    await initMongoose();
    const formData = await request.formData();
    const productIds = formData.get("products").split(",");
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const city = formData.get("city");
    const postalCode = formData.get("postalCode");

    const uniqueIDs = [...new Set(productIds)];
    const products = await Product.find({ _id: { $in: uniqueIDs } }).exec();

    const line_items = products.map((product) => ({
      quantity: productIds.filter((id) => id === product._id.toString()).length,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
    }));

    const order = await Order.create({
      products: line_items,
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      paid: 0,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${request.headers.get("origin")}/?success=true`,
      cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Error creating Stripe session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "GET method is not supported on this route.",
  });
}
