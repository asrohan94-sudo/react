import { StripeVerificationRequest } from "@/api/orders";
import { useMutation } from "@tanstack/react-query";

const useStripeVerification = () => {
  const token = localStorage.getItem("token");

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: verifyStripeMutation,
  } = useMutation({
    mutationFn: ({ success, orderId }) =>
      StripeVerificationRequest({ token: token, success, orderId }),
    onSuccess: (data) => {
      console.log("Successfully verified payment", data);
    },
    onError: (err) => {
      console.log("failed to verify payment", err);
    },
  });
  return {
    isPending,
    isSuccess,
    error,
    verifyStripeMutation,
  };
};

export default useStripeVerification;