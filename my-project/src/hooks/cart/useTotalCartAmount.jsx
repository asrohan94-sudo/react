import useCart from "../context/useCart";
//import useFetchAllProducts from "../products/useFetchAllProducts";

const useTotalCartAmount = () => {
  const { productList, isLoading } = useFetchAllProducts();
  const { cartItems } = useCart();
  let totalAmout = 0;
  if (isLoading) {
    return 0;
  }
  for (let items in cartItems) {
    let itemInfo = productList.find((product) => product._id === items);
    //console.log("item info", itemInfo);
    for (let sizes in cartItems[items]) {
      if (cartItems[items][sizes] > 0) {
        totalAmout += itemInfo.price * cartItems[items][sizes];
      }
    }
  }

  return totalAmout;
};

export default useTotalCartAmount;