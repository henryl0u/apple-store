import { NextResponse } from "next/server";
import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(request) {
  try {
    await initMongoose();
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');
    let products;
    if (ids) {
      products = await Product.find({ '_id': { $in: ids.split(',') } }).exec();
    } else {
      products = await Product.find().exec();
    }
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.error(new Error("Failed to fetch products"));
  }
}
