import axiosconfig from "../../config/axiosconfig";

export const fetchAllProducts = async () => {
  try {
    const response = await axiosconfig.get("/products/list-products");
    console.log("Successfully fetched all the product", response.data.Response);
    return response.data.Response;
  } catch (error) {
    console.log("error in fetching products", error);
    throw new Error("Failed to fetch all the products");
  }
};