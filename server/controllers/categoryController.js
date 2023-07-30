import asyncHandler from "express-async-handler";
import { prisma } from "./index.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const createdCategory = await prisma.category.create({
    data: {
      name: name,
    },
  });
  res.status(201).json(createdCategory);
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      courses: {
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          trainer: {
            select: {
              lastName: true,
              firstName: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json(categories);
});

export const getCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const category = await prisma.category.findFirst({
    where: { id: parseInt(categoryId) },
  });

  if (!category) {
    res.status(404);
    throw new Error(`Categorie id: ${categoryId} not found`);
  }

  res.status(200).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const { name } = req.body;

  const category = await prisma.category.findFirst({
    where: { id: parseInt(categoryId) },
  });

  if (!category) {
    res.status(404);
    throw new Error(`Category id: ${categoryId} not found`);
  }

  const updatedCategory = await prisma.category.update({
    where: { id: category.id },
    data: {
      name,
    },
  });

  res.status(200).json(updatedCategory);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const category = await prisma.category.findFirst({
    where: { id: parseInt(categoryId) },
  });

  if (!category) {
    res.status(404);
    throw new Error(`Category id: ${categoryId} not found`);
  }

  const deletedCategory = await prisma.category.delete({
    where: { id: category.id },
  });

  res.status(200).json(deletedCategory);
});
