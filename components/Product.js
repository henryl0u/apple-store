import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Product({ _id, name, img, price }) {
  const { setSelectedProducts } = useContext(ProductsContext);
  function addToCart() {
    setSelectedProducts((prev) => [...prev, _id]);
  }
  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={img}></img>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm">From ${price}</p>
      </div>
      <div>
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white w-full rounded-xl p-2 mt-2"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
