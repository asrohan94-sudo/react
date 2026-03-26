import axiosconfig from "../../config/axiosconfig";

export const placeOrderByCodRequest = async ({ token, orderData }) => {
  try {
    //console.log("Sending Data to API:", orderData);
    const response = await axiosconfig.post("/order/cod", orderData, {
      headers: {
        "x-access-token": token,
      },
    });

    console.log("Successfully placed order by COD", response.data.Response);
    return response?.data?.Response;
  } catch (error) {
    console.error("Error from API:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Error placing order");
  }
};
export const placeOrderByRazorpayRequest = async ({ token, orderData }) => {
  try {
    const response = await axiosconfig.post("/order/razorPay", orderData, {
      headers: {
        "x-access-token": token,
      },
    });
    console.log(
      "Successfully placed order by razorPay",
      response.data.Response
    );
    return response?.data?.Response;
  } catch (error) {
    console.error("Error from API:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Error placing order by razorPay"
    );
  }
};

export const placeOrderByStripeRequest = async ({ token, orderData }) => {
  try {
    const response = await axiosconfig.post("/order/stripe", orderData, {
      headers: {
        "x-access-token": token,
      },
    });
    console.log("Successfully placed order by Stripe", response.data.Response);
    return response?.data?.Response;
  } catch (error) {
    console.error("Error from API:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Error placing order by Stripe"
    );
  }
};

export const StripeVerificationRequest = async ({
  orderId,
  success,
  token,
}) => {
  try {
    const response = await axiosconfig.post(
      "/order/verify",
      { orderId, success },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("Successfully verified stripe payment", response.data);
    return response.data;
  } catch (error) {
    console.error("Error stripe verification:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Error stripe verification"
    );
  }
};
export const RazorpayVerificationRequest = async ({
  token,
  razorpay_order_id,
}) => {
  try {
    const response = await axiosconfig.post(
      "/order/verifyRazorpay",
      { razorpay_order_id },
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      }
    );
    //console.log("Successfully verified Razorpay payment", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Razorpay verification:",
      error.response?.data || error
    );
    throw new Error(
      error.response?.data?.message || "Error in Razorpay verification"
    );
  }
};

export const usersOrderDetailsRequest = async ({ token }) => {
  try {
    const response = await axiosconfig.get("/order/users-orders", {
      headers: {
        "x-access-token": token,
      },
    });
    /*console.log(
      "Successfully fetched order details of the user",
      response.data.Response
    );*/
    return response?.data?.Response;
  } catch (error) {
    console.error("Error from API:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Error in fetching users order details"
    );
  }
};