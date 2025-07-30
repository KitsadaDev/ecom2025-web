import axios from "axios";

export const createUserCart = async (token, cart) => {
  return await axios.post("https://ecommerce-server-taupe.vercel.app/api/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  return await axios.get("https://ecommerce-server-taupe.vercel.app/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token,address) => {
  return await axios.post("https://ecommerce-server-taupe.vercel.app/api/user/address",{address}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveOrder = async (token, payload) => {
  return axios.post("https://ecommerce-server-taupe.vercel.app/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token) => {
  return axios.get("https://ecommerce-server-taupe.vercel.app/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};