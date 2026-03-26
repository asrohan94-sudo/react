import { registerUserRequest } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useRegisterUser = () => {
  const {
    mutateAsync: registerUserMutation,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: registerUserRequest,
    onSuccess: (data) => {
      console.log("successfully register a new user", data);
    },
    onError: (error) => {
      console.log("failed to register a  new user", error.message);
      toast.error("failed to register a  new user" || error.message);
    },
  });
  return { registerUserMutation, isPending, isSuccess, error };
};
export default useRegisterUser;