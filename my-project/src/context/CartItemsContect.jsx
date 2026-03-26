import useAddProductToCart from "../hooks/cart/useAddProductToCart";
import useFetchCartDetails from "../hooks/cart/useFetchCartDetails";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const CartItemsContext = createContext();
export const CartItemsContextProvider = ({ children }) => {
  const { cartDetails, isFetching } = useFetchCartDetails();
  const [cartItems, setCartItems] = useState({});
  const [ProductSize, setProductSize] = useState("");
  const { addProductToCartMutation } = useAddProductToCart();
  useEffect(() => {
    if (isFetching) return;
    if (cartDetails) {
      setCartItems((prev) => ({
        ...prev,
        ...cartDetails, // Ensure cartDetails structure matches state format
      }));
    }
  }, [cartDetails, isFetching]);
  const addToCart = async (itemId, size) => {
    
  
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
    await addProductToCartMutation({ productId: itemId, size: size });
    toast.success("Product added to Cart");
    console.log("cart items", cartItems);
  };

  const getTotalProductsInCart = () => {
    let totalCount = 0;
    for (let productId in cartItems) {
      let productsSizes = cartItems[productId];
      //console.log("'product sizes", productsSizes);
      {
        /**
                 * 
                 * const cartItems = {
            "product1": { S: 2, M: 1 }, // Product 1: 2 small, 1 medium
            "product2": { L: 3 },       // Product 2: 3 large
          }; */
      }

      for (let sizes in productsSizes) {
        totalCount += productsSizes[sizes];
      }
    }
    return totalCount;
  };

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        getTotalProductsInCart,
        ProductSize,
        setProductSize,
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsContext;