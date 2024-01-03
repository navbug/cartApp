import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [userToken, setUserToken] = useState("");

  const sortProducts = (selectedOption) => {
    if(selectedOption === "Price Descending") {
      const sortedProducts = products.toSorted((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    } else if(selectedOption === "Price Ascending") {
      const sortedProducts = products.toSorted((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    }
  }

  useEffect(() => {
    if(localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    sortProducts();
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data?.products);
      })
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userToken, setUserToken, products, setProducts, query, setQuery, sortProducts }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
