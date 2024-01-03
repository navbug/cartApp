import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

import { useCart } from "../context/CartContext";
import { numWithCommas } from "../components/Card";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, cartTotal, removeFromCart, emptyCart, changeCartQty } =
    useCart();
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="min-h-screen bg-base-200">
        <div className="flex justify-center pt-10 flex-col-reverse pb-6 max-w-6xl mx-auto md:px-14">
          <div className=" rounded-lg shadow-2xl px-4 mx-6">
            <p className="mb-4 w-14 flex items-center font-semibold text-slate-600 underline" onClick={() => navigate("/")}><IoIosArrowBack className="pt-[1px] font-bold text-md"/>Back</p>
            <h1 className="mb-4 text-2xl font-bold">Cart Items: </h1>

            {cart.length ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length &&
                      cart.map((item) => {
                        return (
                          <tr>
                            <th>
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img
                                    src={item?.images[0]}
                                    alt="product image"
                                  />
                                </div>
                              </div>
                            </th>
                            <td>
                              <div>
                                <div className="font-bold">{item?.title}</div>
                              </div>
                            </td>
                            <td>
                              {`₹ ${numWithCommas(item?.price * 83)}`}
                              <span className="text-[11px] font-semibold text-slate-500">
                                {" "}
                                x{item?.qty}
                              </span>
                            </td>
                            <td>
                              <div className="join">
                                <button
                                  className="btn join-item font-bold text-lg"
                                  onClick={() =>
                                    changeCartQty(item.id, item.qty - 1, "dec")
                                  }
                                >
                                  -
                                </button>
                                <input
                                  value={item?.qty}
                                  type="text" inputMode="numeric"
                                  placeholder="0"
                                  className="input input-bordered w-16 max-w-xs join-item"
                                />
                                <button
                                  className="btn join-item font-bold text-lg"
                                  onClick={() =>
                                    changeCartQty(item.id, item.qty + 1, "inc")
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <th>
                              <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => removeFromCart(item)}
                              >
                                <MdDeleteForever className="text-red-500 text-xl" />
                              </button>
                            </th>
                          </tr>
                        );
                      })}
                    {cart.length && (
                      <tr>
                        <td>
                          <div
                            className="mt-4 btn btn-error text-white min-w-20 min-h-10 btn-sm"
                            onClick={() => emptyCart()}
                          >
                            Empty <FaCartShopping />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="font-bold">
                            <span className="mb-1 block">
                              Total ({cart.length} items) :
                            </span>
                           <span className="text-blue-700"> ₹ {numWithCommas(cartTotal)}</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className=" w-[100vh] flex justify-center items-center h-[40vh]">
                <div className="text-2xl">No items in 🛒</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
