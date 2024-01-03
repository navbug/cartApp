import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  let {userToken} = useAuth();
  if(!userToken) userToken = "guest";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(userToken));
    const storedTotal = JSON.parse(localStorage.getItem("total"));
    if(storedCart) {
      setCart(storedCart);
      setCartTotal(storedTotal);
    }

    
  }, []);

  const addToCart = (item) => {
    if(cart.find((cartItem) => cartItem.id === item.id)) {
      return;
    }
    setCart([...cart, item]);
    console.log(JSON.stringify([...cart, item]));
    localStorage.setItem(userToken, JSON.stringify([...cart, item]));
    setCartTotal(cartTotal + item.price * 83);
    localStorage.setItem("total", JSON.stringify(cartTotal + item.price * 83));
  };
  
  const removeFromCart = (item) => {
    let itemID = item.id;
    const updatedCart = cart.filter((item) => item.id !== itemID);
    setCart(updatedCart);
    localStorage.setItem(userToken, JSON.stringify(updatedCart));
    setCartTotal(cartTotal - (item.price * 83 * item.qty));
    localStorage.setItem("total", JSON.stringify(cartTotal - (item.price * 83 * item.qty)));
  }

  const emptyCart = () => {
    setCart([]);
    localStorage.setItem(userToken, JSON.stringify([]));
    setCartTotal(0);
    localStorage.setItem("total", JSON.stringify(0));
  }

  const changeCartQty = (itemID, newQty, change) => {
    const updatedCart = cart.map((item) => {
      if(item.id === itemID) {
        if(newQty < 1) {
          return {...item, qty: 1};
        }
        if(newQty > item.stock) {
          return {...item, qty: item.stock};
        }
        if(change === "inc") {
          setCartTotal(cartTotal + item.price * 83);
          localStorage.setItem("total", JSON.stringify(cartTotal + item.price * 83));
        } else if(change === "dec") {
          setCartTotal(cartTotal - item.price * 83);
          localStorage.setItem("total", JSON.stringify(cartTotal - item.price * 83));
        }
        return {...item, qty: newQty};
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem(userToken, JSON.stringify(updatedCart));
  }

  return (
    <CartContext.Provider value={{cart, cartTotal, addToCart, removeFromCart, emptyCart, changeCartQty}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;