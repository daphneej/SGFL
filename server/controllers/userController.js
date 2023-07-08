import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

import { loginUserSchema, registerUserSchema } from "../models/userModel.js";
import { generateToken, hashPassword, unHashPassword } from "../utils/index.js";

const prisma = new PrismaClient();

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = registerUserSchema.parse(
    req.body
  );

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  delete user.password;

  const token = generateToken({ id: user.id });

  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    })
    .status(201)
    .json(user);
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = loginUserSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await unHashPassword(password, user.password))) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  delete user.password;

  const token = generateToken({ id: user.id });

  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json(user);
});

export const logOutUser = asyncHandler(async (req, res) => {
  res
    .cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .send();
});

export const getUser = asyncHandler(async (req, res) => {
  // Retrieve the user ID from the protected route middleware
  const userId = req.id;

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  delete user.password;

  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.id;

  const { firstName, lastName, email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { id: userId } });

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
      password: password ? await hashPassword(password) : user.password,
    },
  });

  delete updatedUser.password;

  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.id;

  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await prisma.user.delete({ where: { id: user.id } });

  res.status(200).send();
});
