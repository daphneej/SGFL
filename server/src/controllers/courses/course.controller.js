import asyncHandler from "express-async-handler";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../index.js";
import { storage } from "../../utils/firebase.js";

import {
  addCourseBodySchema,
  addCourseFilesSchema,
} from "../../models/course.models.js";

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, categoryId, published } =
    addCourseBodySchema.parse(req.body);

  const { thumbnail: thumbnailFiles, video: videoFiles } =
    addCourseFilesSchema.parse(req.files);

  const thumbnail = thumbnailFiles[0];
  const video = videoFiles[0];

  const thumbnailRef = ref(storage, `images/${uuidv4()}`);
  const videoRef = ref(storage, `video/${uuidv4()}`);

  const thumbnailSnapshot = await uploadBytes(thumbnailRef, thumbnail.buffer, {
    contentType: thumbnail.mimetype,
  });

  const videoSnapshot = await uploadBytes(videoRef, video.buffer, {
    contentType: video.mimetype,
  });

  const thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);
  const videoUrl = await getDownloadURL(videoSnapshot.ref);

  await prisma.course.create({
    data: {
      title,
      description,
      price: parseInt(price),
      categoryId: parseInt(categoryId),
      trainerId: parseInt(req.credentials.id),
      thumbnailUrl,
      videoUrl,
      published,
    },
  });

  res.status(201).json({
    message: "Le cours a bien été créé.",
  });
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    include: {
      category: true,
      trainer: true,
      students: true,
    },
  });

  res.status(200).json(courses);
});

export const getPublishedCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    where: {
      published: "PUBLISHED",
    },
    include: {
      category: true,
      trainer: true,
      students: true,
    },
  });

  res.status(200).json(courses);
});

export const getCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  const course = await prisma.course.findFirst({
    where: { id: parseInt(courseId) },
    include: {
      trainer: true,
    },
  });

  if (!course) {
    res.status(404);
    throw new Error(`Course id: ${courseId} not found`);
  }

  res.status(200).json(course);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  const { title, description, price, published } = req.body;

  const course = await prisma.course.findFirst({
    where: { id: parseInt(courseId) },
  });

  if (!course) {
    res.status(404);
    throw new Error(`Course id: ${courseId} not found`);
  }

  await prisma.course.update({
    where: { id: course.id },
    data: {
      title: title ? title : course.title,
      description: description ? description : course.description,
      price: price ? price : course.price,
      published,
    },
  });

  res.status(200).json({
    message: "Le cours a bien été modifié.",
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
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

  res.status(200).json({
    message: "Le cours a bien été supprimé.",
  });
});
