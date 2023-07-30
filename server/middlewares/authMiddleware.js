import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Middleware pour protéger les routes nécessitant une authentification
export const protectUserRoutes = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403);
    throw new Error(
      "Accès non autorisé. Veuillez vous connecter pour accéder à cette fonctionnalité."
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

    req.credentials = { id, role, token };

    next();
  } catch (error) {
    res.status(403);

    throw new Error(
      "Token invalide ou expiré. Veuillez vous reconnecter pour continuer."
    );
  }
});

// Middleware pour protéger les routes accessibles uniquement aux administrateurs et formateurs
export const protectTrainerRoutes = asyncHandler((req, res, next) => {
  const { role } = req.credentials;

  if (role !== "ADMIN" && role !== "TRAINER") {
    res.status(401);

    throw new Error(
      "Accès non autorisé. Vous n'avez pas suffisamment de privilèges pour accéder à cette fonctionnalité."
    );
  }

  next();
});

// Middleware pour protéger les routes accessibles uniquement aux administrateurs
export const protectAdminRoutes = asyncHandler((req, res, next) => {
  const { role } = req.credentials;

  if (role !== "ADMIN") {
    res.status(401);

    throw new Error({
      message:
        "Accès non autorisé. Vous n'avez pas suffisamment de privilèges pour accéder à cette fonctionnalité.",
    });
  }

  next();
});
