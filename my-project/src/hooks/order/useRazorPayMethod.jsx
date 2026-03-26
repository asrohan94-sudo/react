import { placeOrderByRazorpayRequest } from "@/api/orders";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";
import useRazorpayVerification from "./useRazorpayVerification";
import { useEffect } from 'react';

const useRazorpayMethod = () => {
  const { verifyRazorpayMutation } = useRazorpayVerification();
  const { auth } = useAuth();
 
    console.log("api", import.meta.env.VITE_RAZORPAR_KEY_ID);
  
  const initPay = (razorpayOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAR_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Your Store",
      description: "Order Payment",
      order_id: razorpayOrder.id,
      receipt: razorpayOrder.receipt,
      handler: async (paymentResponse) => {
        console.log("Payment Success:", paymentResponse.razorpay_order_id);
        await verifyRazorpayMutation({
          razorpay_order_id: paymentResponse.razorpay_order_id,
        });
      },
      prefill: {
        email: auth?.user?.email || "", // Prefill user email
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: orderByRazorpayMutation,
  } = useMutation({
    mutationFn: (orderData) =>
      placeOrderByRazorpayRequest({ token: auth?.token, orderData }),
    onSuccess: (data) => {
      console.log("Successfully placed order via razorpay", data);
      if (data?.razorpayOrder) {
        initPay(data.razorpayOrder);
      }
    },
    onError: (err) => {
      console.log("failed to placed order by razorpay", err);
    },
  });
  return {
    isPending,
    isSuccess,
    error,
    orderByRazorpayMutation,
  };
};

export default useRazorpayMethod;