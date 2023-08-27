import asyncHandler from "express-async-handler";
import { prisma } from "../index.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  await prisma.category.create({
    data: {
      name: name,
    },
  });

  res.status(201).json({
    message: "La catégorie a bien été créée.",
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      courses: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      id: "asc",
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

  await prisma.category.update({
    where: { id: category.id },
    data: {
      name,
    },
  });

  res.status(200).json({
    message: "La catégorie a bien été modifiée.",
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const category = await prisma.category.findUnique({
    where: { id: parseInt(categoryId) },
  });

  if (!category) {
    res.status(404);
    throw new Error(`Category id: ${categoryId} not found`);
  }

  await prisma.category.delete({
    where: { id: category.id },
  });

  res.status(200).json({
    message: "La catégorie a bien été supprimée.",
  });
});
