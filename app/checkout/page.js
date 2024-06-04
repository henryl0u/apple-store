"use client";

import Checkout from "@/components/Checkout";
import { ProductsContextProvider } from "@/components/ProductsContext";

export default function Page({ children }) {
  return (
    <ProductsContextProvider>
      <div className="bg-white">
        <div className="p-5">{children}</div>
        <Checkout />
      </div>
    </ProductsContextProvider>
  );
}
