import { prisma } from "../index.js";

export const createCourseService = async (course) => {
  const createdCourse = await prisma.course.create({
    data: course,
  });

  return createdCourse;
};

export const getCoursesService = async () => {
  const courses = await prisma.course.findMany({
    include: {
      category: true,
      trainer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      students: {
        select: {
          id: true,
        },
      },
    },
  });

  return courses;
};

export const getPublishedCoursesService = async () => {
  const courses = await prisma.course.findMany({
    where: {
      published: "PUBLISHED",
    },
    include: {
      category: true,
      trainer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      students: {
        select: {
          id: true,
        },
      },
    },
  });

  return courses;
};

export const getCourseByIdService = async (id) => {
  const course = await prisma.course.findFirst({
    where: { id: parseInt(id) },
    include: {
      category: true,
      trainer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      students: true,
    },
  });

  return course;
};

export const getUserCoursesService = async (userId) => {
  const courses = await prisma.course.findMany({
    where: {
      coursePayments: {
        some: {
          paymentStatus: "SUCCEEDED",
          userId: parseInt(userId),
        },
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      thumbnailUrl: true,
      videoUrl: true,
      createdAt: true,
      trainer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return courses;
};

export const getCoursesInUserCartService = async (userId) => {
  const { coursesInCart } = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: {
      coursesInCart: true,
    },
  });

  return coursesInCart;
};

export const addCourseToUserCartService = async (courseId, userId) => {
  const { coursesInCart } = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      coursesInCart: {
        connect: {
          id: parseInt(courseId),
        },
      },
    },
    select: {
      coursesInCart: true,
    },
  });

  return coursesInCart;
};

export const removeCourseToUserCartService = async (coursesIds, userId) => {
  await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      coursesInCart: {
        disconnect: coursesIds.map((id) => ({ id: parseInt(id) })),
      },
    },
    select: {
      coursesInCart: true,
    },
  });

  return coursesIds?.length;
};

export const updateCourseService = async (course) => {
  const updatedCourse = await prisma.course.update({
    where: { id: course.id },
    data: {
      title: course.title,
      description: course.description,
      price: course.price,
      categoryId: course.categoryId,
      trainerId: course.trainerId,
      createdAt: course.createdAt,
      thumbnailUrl: course.thumbnailUrl,
      videoUrl: course.videoUrl,
      published: course.published,
    },
  });

  return updatedCourse;
};

export const deleteCourseService = async (id) => {
  const deletedCourse = await prisma.course.delete({
    where: { id: parseInt(id) },
  });

  return deletedCourse;
};
