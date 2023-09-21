import asyncHandler from "express-async-handler";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../index.js";
import { storage } from "../../utils/firebase.js";
import stripe from "stripe";

const stripePromise = stripe(process.env.STRIPE_PRIVATE_KEY);

import {
  createCourseService,
  deleteCourseService,
  getCourseByIdService,
  getCoursesService,
  getPublishedCoursesService,
  updateCourseService,
} from "../../services/courses/course.services.js";

import {
  addCourseBodySchema,
  addCourseFilesSchema,
  getCourseByIdSchema,
  updateCourseBodySchema,
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

  const course = {
    title,
    description,
    price: parseInt(price),
    categoryId: parseInt(categoryId),
    trainerId: parseInt(req.credentials.id),
    thumbnailUrl,
    videoUrl,
    published,
  };

  const createdCourse = await createCourseService(course);

  if (!createdCourse) {
    res.status(500);
    throw new Error("Le cours n'a pas pu être créé.");
  }

  res.status(201).json({
    createdCourse,
    message: "Le cours a bien été créé.",
  });
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await getCoursesService();
  res.status(200).json(courses);
});

export const getPublishedCourses = asyncHandler(async (req, res) => {
  const courses = await getPublishedCoursesService();
  res.status(200).json(courses);
});

export const getCourse = asyncHandler(async (req, res) => {
  const { id } = getCourseByIdSchema.parse(req.params);

  const course = await getCourseByIdService(id);

  if (!course) {
    res.status(404);
    throw new Error(`Course id: ${id} not found`);
  }

  res.status(200).json(course);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, description, price, published, categoryId, trainerId } =
    updateCourseBodySchema.parse(req.body);

  const course = await getCourseByIdService(id);

  if (!course) {
    res.status(404);
    throw new Error(`Course id: ${id} not found`);
  }

  const courseToUpdate = {
    ...course,
    title: title ? title : course.title,
    description: description ? description : course.description,
    price: price ? parseFloat(price) : course.price,
    categoryId: categoryId ? parseInt(categoryId) : course.categoryId,
    trainerId: trainerId ? parseInt(trainerId) : course.trainerId,
    published,
  };

  const updatedCourse = await updateCourseService(courseToUpdate);

  if (!updatedCourse) {
    res.status(500);
    throw new Error("Le cours n'a pas pu être modifié.");
  }

  res.status(200).json({
    updatedCourse,
    message: "Le cours a bien été modifié.",
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = getCourseByIdSchema.parse(req.params);

  const course = await prisma.course.findFirst({
    where: { id: parseInt(id) },
  });

  if (!course) {
    res.status(404);
    throw new Error(`Course id: ${course.id} not found`);
  }

  const deletedCourse = await deleteCourseService(course.id);

  res.status(200).json({
    deletedCourse,
    message: "Le cours a bien été supprimé.",
  });
});

export const buyCourseInCart = asyncHandler(async (req, res) => {
  const { id } = req.credentials;
  const { items } = req.body;

  const itemsFound = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      thumbnailUrl: true,
    },
    where: { id: { in: items.map((item) => item.id) } },
  });

  const checkoutSession = await stripePromise.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: itemsFound.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.thumbnailUrl],
        },
        unit_amount: Math.floor(item.price) * 100,
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/dashboard/students`,
    cancel_url: `${process.env.CLIENT_URL}/courses`,
  });

  res.status(200).json({
    url: checkoutSession.url,
  });
});
