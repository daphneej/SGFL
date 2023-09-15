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
