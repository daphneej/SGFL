import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const unHashPassword = async (password, hashedPassword) => {
  const unHashedPassword = await bcryptjs.compare(password, hashedPassword);
  return unHashedPassword;
};

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};
