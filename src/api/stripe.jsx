import axios from "axios";

export const payment = async (token) =>
  await axios.post(
    "https://ecommerce-server-taupe.vercel.app/api/user/create-checkout-session",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
