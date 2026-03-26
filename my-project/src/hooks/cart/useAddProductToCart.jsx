import { addProductTocartRequest } from "../../api/cart/index";


const useAddProductToCart = () => {
  const token = localStorage.getItem("token");

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: addProductToCartMutation,
  } = useMutation({
    mutationFn: ({ productId, size }) =>
      addProductTocartRequest({ productId, size, token: token }),
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
    addProductToCartMutation,
  };
};

export default useAddProductToCart;