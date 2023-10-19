import axios from "axios";
import { fileUpload } from "../utils/fileUpload";

export const createProduct = async (data, images, token) => {
  let image = await fileUpload(images, "products");

  await axios.post(
    "http://localhost:3001/products",
    {
      title: data.title,
      dimensions: data.dimensions,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      image,
    },
    {
      headers: { "user-token": token },
    }
  );
};

export const getProduct = async () => {
  try {
    const response = await axios.get(
      "https://karku-cosmetics-4dsy.vercel.app/products"
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(
      `https://karku-cosmetics-4dsy.vercel.app/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateProduct = async (res,images,id, token) => {
  try {

    let image = await fileUpload(images, "products");

    await axios.put(
      `http://localhost:3001/products/${id}`,
      {
        image,
        title: res.title,
        description: res.description,
        category: res.category,
        dimensions: res.dimensions,
        price: res.price,
        stock: res.stock,
      },
      {
        headers: { "user-token": token },
      }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const DeleteProductById = async (id, token) => {
  try {
    const res = await axios.delete(`http://localhost:3001/products/${id}`, {
      headers: { "user-token": token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
