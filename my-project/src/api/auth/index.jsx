import axiosconfig from "../../config/axiosconfig";

export const loginRequest = async ({ email, password }) => {
  try {
    const response = await axiosconfig.post("/user/login", { email, password });
    console.log("Successfully logged in:", response.data);
    return response.data; // contains success, message, token
  } catch (error) {
    console.error("Error in login:", error.response?.data?.message);
    throw new Error(
      `Error in login: ${error.response?.data?.message || "Failed to log in"}`
    );
  }
};

export const registerUserRequest = async ({ name, email, password }) => {
  try {
    const response = await axiosconfig.post("/user/register", { name, email, password });
    console.log("Successfully registered a new user:", response.data);
    return response.data; // contains success, token
  } catch (error) {
    console.error("Error in register:", error.response?.data?.message);
    throw new Error(
      `Error in register: ${error.response?.data?.message || "Failed to register a new user"}`
    );
  }
};
