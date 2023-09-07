import axios from "axios";

export const Payment = async (carrito) => {
  try {
    window.localStorage.clear();
    await axios
      .post("http://localhost:3001/payment/create-order", { carrito })
      .then((data) => {
        window.location.href = data.data;
      });
  } catch (error) {}
};
