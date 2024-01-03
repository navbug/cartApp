import React from "react";

import Card from "./Card";
import BackgroundImage from "../assets/bg_image.jpg";
import { useAuth } from "../context/AuthContext";

const Main = () => {
  const { products, query, sortProducts } = useAuth();

  let filteredProducts = [];
  if (query) {
    filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return (
    <div>
      <div
        className="hero min-h-[88.7vh] bg-base-200 relative"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="absolute w-full top-0 left-0 right-0 bg-opacity-75 bg-white p-2 flex justify-start">
          <div className="max-w-6xl mx-auto">
            Filters:
            <select
              className="select select-sm select-bordered w-30 max-w-xs ml-2"
              defaultValue={"Price"}
              onChange={(e) => {
                sortProducts(e.target.value);
              }}
            >
              <option disabled>Price</option>
              <option>Price Ascending</option>
              <option>Price Descending</option>
            </select>
          </div>
        </div>
        <div className="hero-content text-neutral-content flex flex-wrap justify-evenly mt-12 max-w-6xl mx-auto ">
          {/* Loading */}
          {products.length === 0 && <div className="loading"></div>}

          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => {
              return <Card key={product.id} product={product} />;
            })}
          {/* Edge case */}
          {filteredProducts.length === 0 && query && (
            <div className="text-2xl font-semibold">No items found.</div>
          )}

          {filteredProducts.length === 0 &&
            !query &&
            products.map((product) => {
              return <Card key={product.id} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Main;
