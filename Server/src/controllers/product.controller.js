import { Product } from "../models/product.js";
import { formatError } from "../utils/formatError.js";

export const createProduct = async (req, res) => {
  const { title, dimensions, description, price, ingredients, category, image } =
    req.body;
  try {
    let product = new Product({
      title: title[0].toUpperCase() + title.slice(1),
      category,
      description: description[0].toUpperCase() + description.slice(1),
      price,
      dimensions,
      ingredients,
      image,
    });
    await product.save();
    return res.status(200).json({ msg: "producto creado" });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const GetAllProduct = async (req, res) => {
  try {
    let products = await Product.find();
    return res.status(200).json(products.reverse());
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const GetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.findById(id);
    return res.status(200).json({ product });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const UpdateProductById = async (req, res) => {
  const { id } = req.params;
  const { title, dimensions, description, price, ingredients, category, image } =
    req.body;

  try {
    let product = await Product.findByIdAndUpdate(
      id,
      {
        title: title[0].toUpperCase() + title.slice(1),
        category,
        description: description[0].toUpperCase() + description.slice(1),
        price,
        dimensions,
        ingredients,
        image: image,
      },
      { new: true }
    );
    return res.status(200).json({ product });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const DeleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndRemove(id);

    return res.status(200).json("producto eliminado");
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const getAllCategories = async (req, res) => {
  try {
    let products = await Product.find();
    const categoriesPrimary = new Set(
      products.map((el) => el.category.primary)
    );
    const categoriesSecondary = new Set(
      products.map((el) => el.category.secondary)
    );
    const uniqueCategoriesPrimary = Array.from(categoriesPrimary);
    const uniqueCategoriesSecondary = Array.from(categoriesSecondary);

    return res.status(200).json({
      categories: {
        primary: uniqueCategoriesPrimary,
        secondary: uniqueCategoriesSecondary,
      },
    });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};
