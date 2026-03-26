import axiosconfig from "../../config/axiosconfig";

export const addProductTocartRequest = async ({ productId, size, token }) => {
  try {
    const response = await axiosconfig.post(
      "/cart/add-to-cart",
      { productId, size },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    //console.log("Successfully added product to cart", response.data.Response);
    return response?.data?.Response;
  } catch (error) {
    console.log("error in adding product to cart", error);
    throw new Error(
      error.response?.data?.message || "Failed to add product to cart"
    );
  }
};

 const updateProductQuantityInCartRequest = async ({
  productId,
  size,
  quantity,
  token,
}) => {
  try {
    const response = await axiosconfig.post(
      "/cart/update-cart",
      { productId, size, quantity },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    /*console.log(
      "Successfully updated product quantity in cart",
      response.data.Response
    );*/
    return response?.data?.Response;
  } catch (error) {
    console.log("error in updating quantity in cart", error.response.data);
    throw new Error(
      error.response?.data || "Failed to updating quantity in cart"
    );
  }
};
export default updateProductQuantityInCartRequest;

export const FetchCartDetailsRequest = async ({ token }) => {
  try {
    const response = await axiosconfig.get("/cart/get-cart-details", {
      headers: {
        "x-access-token": token,
      },
    });
    //console.log("Successfully fetched cart details", response.data.Response);
    return response?.data?.Response;
  } catch (error) {
    //console.log("error in fetching cart details", error.response.data);
    throw error.response.data;
  }
};