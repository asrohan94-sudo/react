import React, { useContext, useEffect, useState } from 'react';
import ShopContext from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { products, currency, cartItems, updateProductQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t-2 pt-10 ml-10">
      <Title text1="YOUR" text2="CART" />

      {/* If cart is empty */}
      {cartData.length === 0 && (
        <p className="text-gray-600 mt-10 text-lg">Your cart is empty.</p>
      )}

      <div>
        {cartData.map((item, index) => {
          const product = products.find(p => p._id === item._id);
          if (!product) return null;

          return (
            <div
              key={index}
              className="py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-3">
                <img
                  src={product.image?.[0] || "/default.jpg"}
                  alt={product.name}
                  className="w-28 h-max sm:w-26 md:w-32 m-2 cursor-pointer"
                />

                <div>
                  <p className="text-xs sm:text-lg font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm font-semibold">
                    {currency}{product.price}
                  </p>
                </div>
              </div>

              {/* FIXED quantity update (using onChange) */}
              <input
                type="number"
                min={1}
                value={item.quantity}
                className="border w-12 sm:w-20 px-2 py-1 text-center"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) {
                    updateProductQuantity(item._id, item.size, value);
                  }
                }}
              />

              {/* Delete button */}
              <img
                src={assets.bin_icon}
                alt=""
                className="w-6 cursor-pointer"
                onClick={() => {
                  updateProductQuantity(item._id, item.size, 0);
                  toast.success("Product removed from cart");
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-5">
        <CartTotal />
      </div>

      {/* PROCEED TO CHECKOUT */}
      <div className="w-full text-end">
        <button
          onClick={() => navigate('/place-order')}
          className="bg-black text-white text-sm my-8 px-5 py-3"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
