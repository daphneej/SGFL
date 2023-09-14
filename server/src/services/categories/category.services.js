import { prisma } from "../index.js";
import { createCategorySchemas } from "../../models/category.models.js";

export const createCategoryService = async (categoryName) => {
  const name = createCategorySchemas.parse(categoryName);

  if (await getCategoryByNameService(name)) {
    throw new Error("La catégorie existe déjà.");
  }

  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  return category;
};

export const getCategoriesService = async () => {
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

  return categories;
};

export const getCategoryByIdService = async (id) => {
  const category = await prisma.category.findFirst({
    where: { id: parseInt(id) },
  });

  return category;
};

export const getCategoryByNameService = async (name) => {
  const category = await prisma.category.findFirst({
    where: { name },
  });

  return category;
};

export const updateCategoryService = async (id, name) => {
  const category = await prisma.category.update({
    where: { id: parseInt(id) },
    data: {
      name,
    },
  });

  return category;
};

export const deleteCategoryService = async (id) => {
  const category = await prisma.category.delete({
    where: { id: parseInt(id) },
  });

  return category;
};
