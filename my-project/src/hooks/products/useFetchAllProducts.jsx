import { fetchAllProducts } from "../../api/product/index";
import { useQuery } from "@tanstack/react-query";

const useFetchAllProducts = () => {
  const {
    data: productList,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["fetchAllProducts"],
    queryFn: fetchAllProducts,
    staleTime: 30000,
  });

  return { productList, isError, isSuccess, isLoading };
};

export default useFetchAllProducts;