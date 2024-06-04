"use client";

import Layout from "@/components/Layout";
import Product from "@/components/Product";
import {
  ProductsContext,
  ProductsContextProvider,
} from "@/components/ProductsContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  const catergoryNames = [
    ...new Set(products.map((product) => product.category)),
  ];

  let showProducts;
  if (search) {
    showProducts = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    showProducts = products;
  }

  return (
    <ProductsContextProvider>
      <Layout>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
          className="bg-gray-100 w-full py-2 px-4 rounded-xl text-black"
        />
        <div>
          {catergoryNames.map((catergoryName) => (
            <div key={catergoryName}>
              {showProducts.find((p) => p.category === catergoryName) && (
                <div>
                  <h1 className="text-2xl py-5 capitalize text-black">
                    {catergoryName}
                  </h1>
                  <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                    {showProducts
                      .filter((p) => p.category === catergoryName)
                      .map((productInfo) => (
                        <div
                          key={productInfo._id}
                          className="px-5 snap-start text-black"
                        >
                          <Product {...productInfo} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Layout>
    </ProductsContextProvider>
  );
}
