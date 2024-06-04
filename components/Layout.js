import { useEffect, useState } from "react";
import Footer from "./Footer";
import { ProductsContext } from "./ProductsContext";
import { ProductsContextProvider } from "./ProductsContext";
import { useContext } from "react";

export default function Layout({ children }) {
  const { setSelectedProducts } = useContext(ProductsContext);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("success=true")) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);

  return (
    <ProductsContextProvider>
      <div className="bg-white">
        <div className="p-5">
          {success && (
            <div
              className="mb-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">
                Your order has been placed.
              </span>
            </div>
          )}
          {children}
        </div>
        <Footer />
      </div>
    </ProductsContextProvider>
  );
}
