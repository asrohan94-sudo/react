import { placeOrderByCodRequest } from "@/api/orders";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";

const useCodMethod = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: orderByCODMutation,
  } = useMutation({
    mutationFn: (orderData) =>
      placeOrderByCodRequest({ token: auth?.token, orderData }),
    onSuccess: (data) => {
      console.log("Successfully added product to cart", data);
    },
    onError: (err) => {
      console.log("failed to added product to cart", err);
    },
  });
  return {
    isPending,
    isSuccess,
    error,
    orderByCODMutation,
  };
};

export default useCodMethod;