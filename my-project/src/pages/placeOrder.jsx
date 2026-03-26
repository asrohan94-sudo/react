import React, { useState,useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

import ShopContext from "../context/ShopContext";

const PlaceOrder = () => {

 const [method,setMethod]=useState('cod')
 const {navigate} = useContext(ShopContext)


  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 pt-8 sm:pt-14 min-h-[80vh] border-t">

      {/* Left Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="mb-4">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            required
            placeholder="First name"
            name="firstName"
            className="rounded border border-gray-400 px-4 py-2 w-full"
          />
          <input
            type="text"
            required
            name="lastName"
            placeholder="Last name"
            className="rounded border border-gray-400 px-4 py-2 w-full"
          />
        </div>

        <input
          type="email"
          required
          name="email"
          placeholder="Enter your email"
          className="rounded border border-gray-400 px-4 py-2 w-full"
        />

        <input
          type="text"
          required
          name="street"
          placeholder="Street"
          className="rounded border border-gray-400 px-4 py-2 w-full"
        />

        <div className="flex gap-3">
          <input
            type="text"
            required
            name="city"
            placeholder="City"
            className="rounded border border-gray-400 px-4 py-2 w-full"
          />
          <input
            type="text"
            required
            name="state"
            placeholder="State"
            className="rounded border border-gray-400 px-4 py-2 w-full"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            required
            name="zipcode"
            placeholder="Zipcode"
            className="rounded border border-gray-400 px-4 py-2 w-full no-spinne"
          />
          <input
            type="text"
            required
            name="country"
            placeholder="Country"
            className="rounded border border-gray-400 px-4 py-2 w-full"
          />
        </div>

        <input
          type="number"
          required
          name="phone"
          placeholder="Contact number"
          className="rounded border border-gray-400 px-4 py-2 w-full no-spinne"
        />

        <hr />
      </div>

      {/* Right Section */}
      <div className="w-full flex flex-col mt-4 sm:mt-0">

        {/* Cart Total */}
        <div className="w-full flex justify-start sm:justify-end">
          <CartTotal />
        </div>

        {/* Payment Section */}
        <div className="mt-6 sm:mt-10 w-full sm:flex sm:justify-end">
          <div className="w-full sm:max-w-[400px]">

            <Title text1="PAYMENT" text2="METHOD" />

           
            {/* Payment Method Options */}
<div className="flex gap-3 flex-col sm:flex-row mt-4">

  {/* Stripe */}
  <div  onClick={()=>setMethod('stripe')}   className="flex items-center  border p-3 px-4 cursor-pointer rounded-lg w-full">
    <p className={`min-w-3.5 h-3.5 rounded-full border-2 ${method === 'stripe' ? 'bg-green-600':''} `}></p>
    <img src={assets.stripe_logo} alt="stripe" className="h-5 mx-4" />
  </div>

  {/* Razorpay */}
  <div  onClick={()=>setMethod('razorpay')}  className="flex items-center  border p-1 px-8 cursor-pointer rounded-lg w-full">
    <p className={`min-w-3.5 h-3.5 rounded-full border-2 ${method === 'razorpay' ? 'bg-green-500':''} `}></p>
    <img src={assets.razorpay_logo} alt="razorpay" className="h-5 mx-4  " />
  </div>

  {/* Cash on Delivery */}
  <div  onClick={()=>setMethod('cod')}  className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg w-full">
    <p className={`min-w-3.5 h-3.5 rounded-full border-2 ${method === 'cod' ? 'bg-green-500':''} `}></p>
    <p className="text-gray-600 text-sm font-medium mx-4">CASH ON DELIVERY</p>
  </div>

</div>

<div className="flex  justify-end w-full mt-2 ">
            <button
              type="submit"
              onClick={() => navigate("/orders")}
              className="bg-black text-white p-2 px-5 mt-2 rounded-sm active:bg-slate-700 "
            >
              PLACE ORDER
            </button>
          </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrder;
