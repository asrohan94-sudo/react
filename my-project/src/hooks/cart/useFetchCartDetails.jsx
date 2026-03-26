import { FetchCartDetailsRequest } from '../../api/cart';
import useAuth from '../auth/useAuth';


const useFetchCartDetails = () => {
  const { auth } = useAuth()
  
    const {
      isError,
      error,
      isSuccess,
      isFetching,
      data: cartDetails,
    } = useQuery({
      queryKey: ["fetchCartDetails"],
      queryFn: () => FetchCartDetailsRequest({ token: auth.token }),
      staleTime: 30000,
    });
    return {
      isError,
      isSuccess,
      isFetching,
      cartDetails,
      error,
    };
}

export default useFetchCartDetails