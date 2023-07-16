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
    throw new Error("Le compte existe déjà");
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
    },
  });

  delete user.password;

  const token = generateToken({ id: user.id, role: user.role });

  res.status(201).json({ user, token });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = loginUserSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await unHashPassword(password, user.password))) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  delete user.password;

  const token = generateToken({ id: user.id, role: user.role });

  res.status(200).json({ user, token });
});

export const logOutUser = asyncHandler(async (req, res) => {
  res.status(200).send();
});

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.credentials;

  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  delete user.password;

  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.credentials;

  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    address,
    phone,
    status,
  } = updateUserSchema.parse(req.body);

  const user = await prisma.user.findFirst({ where: { id } });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: firstName ? firstName : user.firstName,
      lastName: lastName ? lastName : user.lastName,
      email: email ? email : user.email,
      gender: gender ? gender : user.gender,
      address: address ? address : user.address,
      phone: phone ? phone : user.phone,
      status: status ? status : user.status,
      password: password ? await hashPassword(password) : user.password,
    },
  });

  delete updatedUser.password;

  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.credentials;

  const user = await prisma.user.findFirst({ where: { id } });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await prisma.user.delete({ where: { id: user.id } });

  res.status(200).send();
});
