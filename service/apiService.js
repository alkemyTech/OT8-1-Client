const axios = require("axios");

const fetchData = async (endpoint, data, token) => {
  try {
    if (!data) {
      data = {};
    }
    if (token) {
      const response = await axios.get(endpoint, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    }
    const response = await axios.get(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

const postData = async (endpoint, data, token) => {
  try {
    if (!data) {
      data = {};
    }
    if (token) {
      const response = await axios.post(endpoint, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    }
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

module.exports = { fetchData, postData };
