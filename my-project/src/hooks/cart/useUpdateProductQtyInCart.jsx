import  updateProductQuantityInCartRequest  from "../../api/cart";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";

const useUpdateProductQtyInCart = () => {
  const  auth = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateQtyInCartMutation,
  } = useMutation({
    mutationFn: ({ productId, size, quantity }) =>
      updateProductQuantityInCartRequest({
        productId,
        size,
        quantity,
        token: auth?.token,
      }),
    onSuccess: (data) => {
      console.log("Successfully updated product quantity in cart", data);
    },
    onError: (err) => {
      console.log("failed to update product product quantity in  cart", err);
    },
  });
  return {
    isPending,
    isSuccess,
    error,
    updateQtyInCartMutation,
  };
};

export default useUpdateProductQtyInCart;