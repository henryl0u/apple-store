import { NextResponse } from "next/server";
import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Order";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  await initMongoose();

  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event;
  try {
    const payload = await buffer(request);
    const signature = request.headers.get('stripe-signature');
    event = stripe.webhooks.constructEvent(payload, signature, signingSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const metadata = event.data.object.metadata;
    const paymentStatus = event.data.object.payment_status;

    if (metadata.orderId && paymentStatus === "paid") {
      try {
        await Order.findByIdAndUpdate(metadata.orderId, { paid: 1 });
      } catch (err) {
        console.error(`Failed to update order: ${err.message}`);
        return NextResponse.json(
          { error: "Failed to update order" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ message: "ok" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
