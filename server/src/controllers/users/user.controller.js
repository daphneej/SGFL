import asyncHandler from "express-async-handler";

import {
  loginUserSchema,
  registerUserSchema,
} from "../../models/user.models.js";

import {
  generateToken,
  hashPassword,
  unHashPassword,
} from "../../utils/index.js";

import { prisma } from "../index.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = registerUserSchema.parse(req.body);

  if (await prisma.user.findFirst({ where: { email } })) {
    res.status(409);
    throw new Error(
      "Désolé, cet e-mail est déjà associé à un compte existant."
    );
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
    },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: true,
    },
  });

  delete user.password;

  const token = generateToken({ id: user.id, role: user.role });

  res.status(201).json({
    message: "Félicitations ! Votre compte a été créé avec succès.",
    user: { ...user, token },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = loginUserSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: {
        include: {
          trainer: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (!user || !(await unHashPassword(password, user.password))) {
    res.status(400);
    throw new Error(
      "Les informations de connexion sont incorrectes. Veuillez vérifier votre e-mail et mot de passe."
    );
  }

  delete user.password;

  const token = generateToken({ id: user.id, role: user.role });

  res.status(200).json({
    message: "Connexion réussie. Bienvenue !",
    user: { ...user, token },
  });
});

export const logOutUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: "Déconnexion réussie. À bientôt !", user: null });
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: true,
    },
  });

  res.status(200).json(
    users.map((user) => {
      delete user.password;
      return user;
    })
  );
});

export const getUser = asyncHandler(async (req, res) => {
  const { id, token } = req.credentials;

  const user = await prisma.user.findFirst({
    where: { id: parseInt(id) },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: true,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error(
      "Malheureusement, nous n'avons pas pu trouver d'utilisateur avec ces informations."
    );
  }

  delete user.password;

  res.status(200).json({ ...user, token });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id, token } = req.credentials;

  const user = await prisma.user.findFirst({
    where: { id: parseInt(id) },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: true,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error(
      "Malheureusement, nous n'avons pas pu trouver d'utilisateur avec ces informations."
    );
  }

  const {
    firstName,
    lastName,
    email,
    role,
    password,
    gender,
    address,
    phone,
    status,
  } = req.body;

  if (
    email &&
    (await prisma.user.findFirst({
      where: { AND: [{ email, NOT: { id: parseInt(id) } }] },
    }))
  ) {
    res.status(409);
    throw new Error(
      "Désolé, cet e-mail est déjà associé à un compte existant."
    );
  }

  if (
    phone &&
    (await prisma.user.findFirst({
      where: { AND: [{ phone, NOT: { id: parseInt(id) } }] },
    }))
  ) {
    res.status(409);
    throw new Error(
      "Désolé, ce numéro de téléphone est déjà associé à un compte existant."
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: firstName && firstName.length > 0 ? firstName : user.firstName,
      lastName: lastName && lastName.length > 0 ? lastName : user.lastName,
      email: email && email.length > 0 ? email : user.email,
      role: role && role.length > 0 ? role : user.role,
      gender:
        gender && gender.length > 0 ? gender.toLocaleUpperCase() : user.gender,
      address: address && address.length > 0 ? address : user.address,
      phone: phone && phone.length > 0 ? phone : user.phone,
      status: status && status.length > 0 ? status : user.status,
      password:
        password && password.length > 0
          ? await hashPassword(password)
          : user.password,
    },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: true,
    },
  });

  delete updatedUser.password;

  res.status(200).json({
    message: "Votre profil a ete mis à jour avec succès.",
    user: { ...updatedUser, token },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });

  if (!user) {
    res.status(404);
    throw new Error(
      "Malheureusement, nous n'avons pas pu trouver d'utilisateur avec ces informations."
    );
  }

  await prisma.user.delete({ where: { id: user.id } });

  res.status(200).json({
    message: "Compte supprimé avec succès. Merci pour votre confiance.",
  });
});

export const toggleCourseInCart = asyncHandler(async (req, res) => {
  const { id, token } = req.credentials;

  const user = await prisma.user.findFirst({
    where: { id: parseInt(id) },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: true,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error(
      "Malheureusement, nous n'avons pas pu trouver d'utilisateur avec ces informations."
    );
  }

  const { coursesInCart: updatedCoursesInCart } = req.body;

  const removedCourses = updatedCoursesInCart.filter((course) =>
    user.coursesInCart.some((updatedCourse) => updatedCourse.id === course.id)
  );

  const addedCourses = updatedCoursesInCart.filter(
    (updatedCourse) =>
      !user.coursesInCart.some((course) => course.id === updatedCourse.id)
  );

  let message = "";

  if (removedCourses.length > 0) {
    if (removedCourses.length > 1) {
      message = "Les cours ont bien été supprimés de votre panier";
    } else {
      message = "Le cours a bien été supprimé de votre panier";
    }
  } else {
    message = "Le cours a bien été ajouté à votre panier";
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      coursesInCart: {
        connect: addedCourses.map((course) => ({ id: course.id })),
        disconnect: removedCourses.map((course) => ({ id: course.id })),
      },
    },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: true,
    },
  });

  res.status(200).json({
    message,
    user: { ...updatedUser, token },
  });
});

export const buyCourseInCart = asyncHandler(async (req, res) => {
  const { id, token } = req.credentials;

  const user = await prisma.user.findFirst({
    where: { id: parseInt(id) },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: true,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error(
      "Malheureusement, nous n'avons pas pu trouver d'utilisateur avec ces informations."
    );
  }

  const { enrolledCourses: updatedBoughtCourses } = req.body;

  const boughtCourses = updatedBoughtCourses.filter((course) =>
    user.coursesInCart.some((updatedCourse) => updatedCourse.id === course.id)
  );

  let message = "";

  if (boughtCourses?.length === 1) {
    message = "Le cours a bien été acheté";
  } else if (boughtCourses?.length > 1) {
    message = "Les cours ont bien été achetés";
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      enrolledCourses: {
        connect: boughtCourses.map((course) => ({ id: course.id })),
      },
      coursesInCart: {
        disconnect: boughtCourses.map((course) => ({ id: course.id })),
      },
      role: user.role !== "USER" ? user.role : "STUDENT",
    },
    include: {
      coursesInCart: true,
      createdCourses: true,
      enrolledCourses: {
        include: {
          trainer: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({
    message,
    user: { ...updatedUser, token },
  });
});
