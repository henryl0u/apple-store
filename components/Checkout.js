"use client";

import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "@/components/ProductsContext";
import Layout from "./Layout";
import Billing from "./Billing";

export default function Checkout() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [products, setProducts] = useState([]);

  function addProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function removeProduct(id) {
    const position = selectedProducts.indexOf(id);
    if (position !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((_, index) => index !== position);
      });
    }
  }

  useEffect(() => {
    if (selectedProducts && selectedProducts.length > 0) {
      const uniqueIDs = [...new Set(selectedProducts)];
      fetch(`/api/products?ids=${uniqueIDs.join(",")}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [selectedProducts]);

  let subTotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const product = products.find((p) => p._id === id);
      if (product) {
        subTotal += product.price;
      }
    }
  }

  const delivery = 0; // Assuming delivery is free as in the original code

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch("/api/checkout", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { url } = await response.json();
      window.location.href = url;
    } else {
      const errorData = await response.json();
      console.error("Failed to create checkout session:", errorData);
    }
  };

  return (
    <Layout>
      <div>
        {!products.length && <div className="text-black">Cart empty</div>}
        {products.length &&
          products.map((product) => (
            <div className="flex mb-5" key={product._id}>
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img
                  className="w-24"
                  src={product.img}
                  alt={product.name}
                ></img>
              </div>
              <div className="pl-4">
                <h3 className="text-black font-bold text-lg">{product.name}</h3>
                <div className="flex">
                  <div className="text-black grow pr-1">${product.price}</div>
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="px-2 bg-blue-500 rounded-xl"
                  >
                    -
                  </button>
                  <span className="text-black px-2">
                    {selectedProducts.filter((id) => id === product._id).length}
                  </span>
                  <button
                    onClick={() => addProduct(product._id)}
                    className="px-2 bg-blue-500 rounded-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        <form onSubmit={handleSubmit}>
          {products.length && <Billing />}
          <div className="mt-4">
            <div className="flex my-3">
              <h3 className="text-black font-bold text-lg grow">Subtotal</h3>
              <h3 className="text-black">${subTotal.toFixed(2)}</h3>
            </div>
            <div className="flex my-3">
              <h3 className="text-black font-bold text-lg grow">Delivery</h3>
              <h3 className="text-black">${delivery.toFixed(2)}</h3>
            </div>
            <div className="flex my-3 border-t pt-3 border-dashed border-gray-600">
              <h3 className="text-black font-bold text-lg grow">Total</h3>
              <h3 className="text-black">
                ${(subTotal + delivery).toFixed(2)}
              </h3>
            </div>
          </div>
          <input
            type="hidden"
            name="products"
            value={selectedProducts.join(",")}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full rounded-xl p-2 my-2 mt-2 font-bold shadow-lg shadow-blue-300"
          >
            Checkout
          </button>
        </form>
      </div>
    </Layout>
  );
}
