import React from "react";
import { useNavigate } from "react-router-dom";

import SwitchMode from "./SwitchMode";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { numWithCommas } from "./Card";
import CartLogoImage from "../assets/cart_logo.png";

const Navbar = () => {
  const { user, setUser, setQuery, query } = useAuth();
  const { cart, emptyCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <div className="navbar bg-base-100 flex justify-between max-w-6xl mx-auto md:px-12">
        <div className="ml-4 ">
          <a
            className="link no-underline text-xl text-slate-700 flex gap-2 font-semibold"
            href="/"
          >
            <img src={CartLogoImage} alt="logo" width="20px" />
            <span className="hidden md:block">CartApp</span>
          </a>
        </div>
        <div className="form-control">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            type="text"
            placeholder="Search"
            className="input input-bordered w-32 md:w-64"
          />
        </div>
        <div className="mr-4">
          {user && (
            <div className="dropdown dropdown-end mr-3">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cart.length}
                  </span>
                </div>
              </div>
              {cart.length > 0 && (
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                  <div className="card-body">
                    <span className="font-bold text-lg">
                      {cart.length} Items
                    </span>
                    <span className="text-info">
                      Subtotal: ₹{numWithCommas(cartTotal)}
                    </span>
                    <div className="card-actions">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => navigate("/cart")}
                      >
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="avatar" src={user?.image} />
                </div>
              </div>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-3"
              >
                <div>{`Name: ${user?.firstName} ${user?.lastName}`}</div>
                <div>{`Email: ${user?.email}`}</div>
                <div
                  className="btn btn-primary btn-sm w-16"
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("user");
                    emptyCart();
                  }}
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <div
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
          )}
          <SwitchMode />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
