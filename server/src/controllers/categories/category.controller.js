import asyncHandler from "express-async-handler";

import {
  createCategoryService,
  getCategoriesService,
  getCategoriesWithCoursesService,
  getCategoryByIdService,
  getCategoryByNameService,
  updateCategoryService,
  deleteCategoryService,
} from "../../services/categories/category.services.js";

import {
  createCategorySchema,
  getCategoryByIdSchema,
  updateCategorySchema,
} from "../../models/category.models.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = createCategorySchema.parse(req.body);

  if (await getCategoryByNameService(name)) {
    res.status(409);
    throw new Error("La catégorie existe déjà.");
  }

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

export const getCategoriesWithCourses = asyncHandler(async (req, res) => {
  const categories = await getCategoriesWithCoursesService();
  res.status(200).json(
    categories.map((category) => {
      return { ...category, coursesLength: category?.courses?.length };
    })
  );
});

export const getCategory = asyncHandler(async (req, res) => {
  const { id } = getCategoryByIdSchema.parse(req.params);

  const foundedCategory = await getCategoryByIdService(id);

  if (!foundedCategory) {
    res.status(404);
    throw new Error(`Category id: ${id} not found`);
  }

  res.status(200).json(foundedCategory);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = getCategoryByIdSchema.parse(req.params);

  const { name } = updateCategorySchema.parse(req.body);

  const category = await getCategoryByIdService(id);

  if (!category) {
    res.status(404);
    throw new Error(`Category id: ${id} not found`);
  }

  const updatedCategry = await updateCategoryService(category.id, name);

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
  const { id } = getCategoryByIdSchema.parse(req.params);

  const category = await getCategoryByIdService(id);

  if (!category) {
    res.status(404);
    throw new Error(`Category id: ${id} not found`);
  }

  const deletedCategory = await deleteCategoryService(category.id);

  if (!deletedCategory) {
    res.status(500);
    throw new Error("La catégorie n'a pas pu être supprimée.");
  }

  res.status(200).json({
    deletedCategory,
    message: "La catégorie a bien été supprimée.",
  });
});
