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
  getUserCoursesService,
  getPaymentsService,
  addCourseToUserCartService,
  removeCourseToUserCartService,
  getPublishedCoursesService,
  getCoursesInUserCartService,
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

export const getUserCourses = asyncHandler(async (req, res) => {
  const { id } = req.credentials;

  const courses = await getUserCoursesService(id);

  res.status(200).json(courses);
});

export const getPayments = asyncHandler(async (req, res) => {
  const payments = await getPaymentsService();
  res.status(200).json(payments);
});

export const getCourseInUserCart = asyncHandler(async (req, res) => {
  const { id } = req.credentials;
  const courses = await getCoursesInUserCartService(id);
  res.status(200).json(courses);
});

export const addCourseToUserCart = asyncHandler(async (req, res) => {
  const { id } = req.credentials;
  const { courseId } = req.body;

  await addCourseToUserCartService(courseId, id);

  res.status(200).json({
    message: "Le cours a bien été ajouté au panier.",
  });
});

export const removeCourseToUserCart = asyncHandler(async (req, res) => {
  const { id } = req.credentials;
  const { coursesIds } = req.body;

  const removedCoursesCount = await removeCourseToUserCartService(
    coursesIds,
    id
  );

  res.status(200).json({
    message:
      removedCoursesCount <= 1
        ? "Le cours a bien été retiré du panier."
        : "Le panier a bien été vidé.",
  });
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

export const checkoutCourseInCart = asyncHandler(async (req, res) => {
  const { id: userId } = req.credentials;
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

  // Step 1: Create a Stripe session
  const session = await stripePromise.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: itemsFound.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.thumbnailUrl],
        },
        unit_amount: Math.floor(item.price * 100),
      },
      quantity: 1,
    })),
    mode: "payment",
    // Pass the payment intent ID to the success URL
    success_url: `${process.env.CLIENT_URL}/dashboard/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/dashboard/canceled?sessionId={CHECKOUT_SESSION_ID}`,
  });

  // Step 2: Insert payment information into the database after creating the Stripe session
  const coursePayments = await prisma.coursePayment.createMany({
    data: itemsFound.map((item, index) => ({
      courseId: item.id,
      userId: userId,
      paymentAmount: item.price,
      paymentMethod: "STRIPE", // Assuming Stripe payment method
      paymentStatus: "PENDING", // Set the initial status to PENDING
      // Store the payment intent ID from the Stripe session
      paymentIntentId: session.id,
    })),
  });

  res.status(200).json({ session });
});

export const processPaymentSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const session = await stripePromise.checkout.sessions.retrieve(sessionId);

  await prisma.coursePayment.updateMany({
    where: { paymentIntentId: session.id },
    data: {
      paymentStatus: "SUCCEEDED",
    },
  });

  const paidCourses = await prisma.course.findMany({
    where: {
      coursePayments: {
        some: {
          paymentStatus: "SUCCEEDED",
          paymentIntentId: session.id,
        },
      },
    },
  });

  const { userId } = await prisma.coursePayment.findFirst({
    where: { paymentIntentId: session.id },
    select: { userId: true },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      coursesInCart: {
        disconnect: paidCourses.map((course) => ({ id: course.id })),
      },
    },
  });

  res.status(200).json();
});

export const cancelPaymentSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const session = await stripePromise.checkout.sessions.retrieve(sessionId);

  await prisma.coursePayment.deleteMany({
    where: { paymentIntentId: session.id },
  });

  res.sendStatus(200);
});
