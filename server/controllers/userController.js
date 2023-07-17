import asyncHandler from "express-async-handler";

import {
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
} from "../models/userModel.js";

import { generateToken, hashPassword, unHashPassword } from "../utils/index.js";

import { prisma } from "./index.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = registerUserSchema.parse(req.body);

  if (
    await prisma.user.findFirst({
      where: {
        email,
      },
    })
  ) {
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

  const user = await prisma.user.findUnique({ where: { email } });

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
  delete req.credentials;

  res
    .status(200)
    .json({ message: "Déconnexion réussie. À bientôt !", user: null });
});

export const getUser = asyncHandler(async (req, res) => {
  const { id, token } = req.credentials;

  const user = await prisma.user.findFirst({
    where: { id },
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

  const parsedUser = updateUserSchema.parse(req.body);

  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    address,
    phone,
    status,
  } = parsedUser;

  const user = await prisma.user.findFirst({ where: { id } });

  if (!user) {
    res.status(404);
    throw new Error(
      "Malheureusement, nous n'avons pas pu trouver d'utilisateur avec ces informations."
    );
  }

  if (email && email === user.email) {
    res.status(400);
    throw new Error(
      "Email inchangé. Veuillez saisir une adresse email différente."
    );
  }

  if (
    email &&
    (await prisma.user.findFirst({ where: { email: req.body.email } }))
  ) {
    res.status(409);
    throw new Error(
      "Désolé, cet e-mail est déjà associé à un compte existant."
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: firstName && firstName.length > 0 ? firstName : user.firstName,
      lastName: lastName && lastName.length > 0 ? lastName : user.lastName,
      email: email && email.length > 0 ? email : user.email,
      gender: gender && gender.length > 0 ? gender : user.gender,
      address: address && address.length > 0 ? address : user.address,
      phone: phone && phone.length > 0 ? phone : user.phone,
      status: status && status.length > 0 ? status : user.status,
      password:
        password && password.length > 0
          ? await hashPassword(password)
          : user.password,
    },
  });

  delete updatedUser.password;

  res.status(200).json({
    message: "Profil mis à jour avec succès.",
    user: { ...updatedUser, token },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.credentials;

  const user = await prisma.user.findFirst({ where: { id } });

  if (!user) {
    res.status(404);
    throw new Error(
      "Malheureusement, nous n'avons pas pu trouver d'utilisateur avec ces informations."
    );
  }

  await prisma.user.delete({ where: { id: user.id } });

  delete req.user;

  res.status(200).json({
    message: "Compte supprimé avec succès. Merci pour votre confiance.",
    user: null,
  });
});
