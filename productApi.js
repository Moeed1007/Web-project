import axios from "axios";

const API_URL = "http://localhost/football%20backend";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_products.php`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      products: [],
      message: "Failed to fetch products"
    };
  }
};
export const addProduct = async (productData) => {
  try {

    const response = await axios.post(
      "http://localhost/football%20backend/add_product.php",
      productData
    );

    return response.data;

  } catch (error) {

    return {
      success:false,
      message:"Server Error"
    };

  }
};
export const updateProduct = async (productData) => {
  try {
    const response = await axios.post(
      "http://localhost/football%20backend/update_product.php",
      productData
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Server Error"
    };
  }
};
export const deleteProduct = async (id) => {
  try {
    const response = await axios.post(
      "http://localhost/football%20backend/delete_product.php",
      { id: id }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Server Error"
    };
  }
};
export const getNavLinks = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_nav_links.php`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      links: []
    };
  }
};

export const getHomepageCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_homepage_cards.php`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      cards: []
    };
  }
};