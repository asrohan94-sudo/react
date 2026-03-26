import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../../api/auth";
import { toast } from "react-toastify";

const useLogin = () => {
  const { mutateAsync, isLoading, isSuccess, error } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      console.log("Successfully logged in", data);

      // Save user data and token
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      toast.success("Login successful");
    },
    onError: (err) => {
      console.log("Failed to login", err);
      const message = err.response?.data?.message || err.message || "Failed to login";
      toast.error(message);
    },
  });

  return {
    login: mutateAsync, // rename for easy usage
    isLoading,
    isSuccess,
    error,
  };
};

export default useLogin;
