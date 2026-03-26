import { placeOrderByStripeRequest } from "@/api/orders";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";

const useStripeMethod = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: orderByStripeMutation,
  } = useMutation({
    mutationFn: (orderData) =>
      placeOrderByStripeRequest({ token: auth?.token, orderData }),
    onSuccess: (data) => {
      console.log("Successfully placed order by stripe", data);
      if (data?.checkoutUrl) {
        window.location.replace(data.checkoutUrl); // Redirect to Stripe checkout
      }
    },
    onError: (err) => {
      console.log("failed to placed order by stripe", err);
    },
  });
  return {
    isPending,
    isSuccess,
    error,
    orderByStripeMutation,
  };
};

export default useStripeMethod;