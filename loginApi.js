import axios from "axios";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost/football%20backend/login_processing.php",
      userData
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Server error. Please try again."
    };
  }
};