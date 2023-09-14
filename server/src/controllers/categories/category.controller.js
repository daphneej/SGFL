import asyncHandler from "express-async-handler";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  getCategoryByNameService,
  updateCategoryService,
} from "../../services/categories/category.services.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const createdCategory = await createCategoryService(name);

  if (!createdCategory) {
    res.status(500);
    throw new Error("La catégorie n'a pas pu être créée.");
  }

  res.status(201).json({
    createdCategory,
    message: "La catégorie a bien été créée.",
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getCategoriesService();
  res.status(200).json(categories);
});

export const getCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryByIdService(categoryId);

  if (!category) {
    res.status(404);
    throw new Error(`Categorie id: ${categoryId} not found`);
  }

  res.status(200).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const { name } = req.body;

  const category = await getCategoryByIdService(categoryId);

  if (!category) {
    res.status(404);
    throw new Error(`Category id: ${categoryId} not found`);
  }

  const updatedCategry = await updateCategoryService(categoryId, name);

  if (!updateCategory) {
    res.status(500);
    throw new Error("La catégorie n'a pas pu être modifiée.");
  }

  res.status(200).json({
    updatedCategry,
    message: "La catégorie a bien été modifiée.",
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryByIdService(categoryId);

  if (!category) {
    res.status(404);
    throw new Error(`Category id: ${categoryId} not found`);
  }

  const deletedCategory = await deleteCategoryService(categoryId);

  if (!deletedCategory) {
    res.status(500);
    throw new Error("La catégorie n'a pas pu être supprimée.");
  }

  res.status(200).json({
    deletedCategory,
    message: "La catégorie a bien été supprimée.",
  });
});
