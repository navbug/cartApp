import React from "react";
import { FaCartShopping } from "react-icons/fa6";

import { useCart } from "../context/CartContext";

export function numWithCommas(number) {
  number = number.toString();
  return number.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
}

const Card = ({ product }) => {
  const {cart, addToCart} = useCart();
  const productDesc = product?.description.length > 64;

  const handleAddToCart = () => {
    const prod = {
      ...product,
      qty: 1,
    };
    addToCart(prod);
  }

  return (
    <div>
      <div className="card w-72 h-64 glass">
        <figure className="h-48">
          <img
            src={product?.images[0]}
            alt="car!"
            className="w-full object-cover"
          />
        </figure>
        <div className="flex flex-col p-2 gap-1">
          <div className="flex justify-between">
            <h2 className="card-title">{product?.title}</h2>
            <p>₹ {numWithCommas(product?.price * 83)}</p>
          </div>
          <p>
            {product?.description.slice(0, 64)}
            {productDesc ? "..." : ""}
          </p>
          <div className="card-actions ">
            {cart.find((cartItem) => cartItem.id === product.id) ? (
              <button className="btn btn-success btn-sm text-white">
                Added to <FaCartShopping />
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={handleAddToCart}>
                Add to <FaCartShopping />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
