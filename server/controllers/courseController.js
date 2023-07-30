import { prisma } from "./index.js";
import asyncHandler from "express-async-handler";

export const createCourse = asyncHandler(async function (req, res) {
  const { title, description, price, categoryId } = req.body;

  const createdCourse = await prisma.course.create({
    data: {
      title: title,
      description: description,
      price: parseInt(price),
      trainerId: parseInt(req.credentials.id),
      categoryId: parseInt(categoryId),
    },
  });

  res.status(201).json(createdCourse);
});

export const getCourses = asyncHandler(async function (req, res) {
  const courses = await prisma.course.findMany({
    include: {
      trainer: {
        select: {
          lastName: true,
          firstName: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.status(200).json(courses);
});

export const getCourse = asyncHandler(async function (req, res) {
  const courseId = req.params.id;

  const course = await prisma.course.findFirst({
    where: { id: parseInt(courseId) },
  });

  if (!course) {
    res.status(404);
    throw new Error(`Course id: ${courseId} not found`);
  }

  res.status(200).json(course);
});

export const updateCourse = asyncHandler(async function (req, res) {
  const courseId = req.params.id;

  const { title, description, price } = req.body;

  const course = await prisma.course.findFirst({
    where: { id: parseInt(courseId) },
  });

  if (!course) {
    res.status(404);
    throw new Error(`Course id: ${courseId} not found`);
  }

  const updatedCourse = await prisma.course.update({
    where: { id: course.id },
    data: {
      title: title ? title : course.title,
      description: description ? description : course.description,
      price: price ? price : course.price,
    },
  });

  res.status(200).json(updatedCourse);
});

export const deleteCourse = asyncHandler(async function (req, res) {
  const courseId = req.params.id;

  const course = await prisma.course.findFirst({
    where: { id: parseInt(courseId) },
  });

  if (!course) {
    res.status(404);
    throw new Error(`Course id: ${courseId} not found`);
  }

  const deletedCourse = await prisma.course.delete({
    where: { id: course.id },
  });

  res.status(200).json(deletedCourse);
});
