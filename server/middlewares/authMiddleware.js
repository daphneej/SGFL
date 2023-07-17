import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protectRoutes = asyncHandler(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401);
    throw new Error(
      "Accès non autorisé. Veuillez vous connecter pour accéder à cette fonctionnalité."
    );
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

    req.credentials = {
      id,
      role,
      token,
    };

    next();
  } catch (error) {
    res.status(401);
    throw new Error(
      "Token invalide ou expiré. Veuillez vous reconnecter pour continuer."
    );
  }
});
