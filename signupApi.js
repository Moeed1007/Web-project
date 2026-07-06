import axios from "axios";

export const signupUser = async (userData) => {
    try {
        const response = await axios.post(
            "http://localhost/football%20backend/signup_processing.php",
            userData
        );
        return response.data;
    } catch (error) {
        console.error("Signup error:", error);
        return {
            success: false,
            message: "Server error. Please try again."
        };
    }
};