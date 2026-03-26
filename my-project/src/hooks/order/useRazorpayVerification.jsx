import { RazorpayVerificationRequest } from "@/api/orders";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCart from "../context/useCart";

const useRazorpayVerification = () => {
  const navigate = useNavigate();
  const { setCartItems } = useCart();
  const token = localStorage.getItem("token");
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: verifyRazorpayMutation,
  } = useMutation({
    mutationFn: ({ razorpay_order_id }) =>
      RazorpayVerificationRequest({ token: token, razorpay_order_id }),
    onSuccess: (data) => {
      console.log("Successfully verified payment", data);
      navigate("/orders");
      setCartItems({});
      toast.success("Your order has been placed successfully");
    },
    onError: (err) => {
      console.log("failed to verify payment", err);
      toast.error(err);
    },
  });
  return {
    isPending,
    isSuccess,
    error,
    verifyRazorpayMutation,
  };
};

export default useRazorpayVerification;