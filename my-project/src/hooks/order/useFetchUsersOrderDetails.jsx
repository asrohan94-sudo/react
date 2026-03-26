
import { usersOrderDetailsRequest } from '@/api/orders';
import { useQuery } from "@tanstack/react-query";
const useFetchUsersOrderDetails = () => {
      const token=localStorage.getItem("token")
    
  const {
    data: orderedProductList,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["fetchUsersOrderDetails"],
    queryFn: () => usersOrderDetailsRequest({ token: token }),
    staleTime: 30000,
  });

  return { orderedProductList, isError, isSuccess, isLoading };
  
}

export default useFetchUsersOrderDetails
