import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShopContext = createContext();

const backendUrl = "http://localhost:5000";

export const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const currency = "৳";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true); 
  const [cartItems, setCartItems] = useState({});

  // ------------------------
  // FETCH PRODUCTS
  // ------------------------
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/courses`);
      const data = response.data;

      // Make sure we read products correctly regardless of API shape
      const fetchedProducts = data.products || data.courses || [];
      if (Array.isArray(fetchedProducts)) {
        setProducts(fetchedProducts);
      } else {
        setProducts([]);
        toast.error("No products found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ------------------------
  // FETCH SINGLE PRODUCT
  // ------------------------
  const fetchProductById = async (id) => {
    if (!id) return null;
    try {
      const res = await axios.get(`${backendUrl}/api/courses/${id}`);
      return res.data.product || res.data.course || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // ------------------------
  // ADD TO CART
  // ------------------------
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select size");
      return;
    }

    setCartItems((prev) => {
      const newCart = { ...prev };
      if (!newCart[itemId]) newCart[itemId] = {};
      newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
      return newCart;
    });

    toast.success("Added to cart");
  };

  // ------------------------
  // UPDATE QUANTITY
  // ------------------------
  const updateProductQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (!newCart[itemId]) return prev;

      if (quantity <= 0) {
        delete newCart[itemId][size];
        if (Object.keys(newCart[itemId]).length === 0) delete newCart[itemId];
      } else {
        newCart[itemId][size] = quantity;
      }

      return newCart;
    });
  };

  // ------------------------
  // REMOVE ITEM
  // ------------------------
  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (!newCart[itemId]) return prev;

      delete newCart[itemId][size];
      if (Object.keys(newCart[itemId]).length === 0) delete newCart[itemId];

      return newCart;
    });
  };

  // ------------------------
  // CART COUNT
  // ------------------------
  const getCartCount = () =>
    Object.values(cartItems).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );

  // ------------------------
  // CART TOTAL
  // ------------------------
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      const item = products.find((p) => p._id === itemId);
      if (!item) return total;

      const sum = Object.values(sizes).reduce((acc, qty) => acc + item.price * qty, 0);
      return total + sum;
    }, 0);
  };

  // ------------------------
  // CONTEXT VALUE
  // ------------------------
  const value = {
    backendUrl,
    products,
    loading,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateProductQuantity,
    removeFromCart,
    getCartCount,
    getCartAmount,
    fetchProductById,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContext;